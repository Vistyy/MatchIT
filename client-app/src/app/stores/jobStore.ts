import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Job, JobFormValues } from "../models/job";
import { Pagination, PagingParams } from "../models/pagination";
import { Skill, UserFile } from "../models/profile";
import { store } from "./store";
import { v4 as uuid } from "uuid";
import { SkillSearchItem } from "../models/search";
import { history } from "../..";

export default class JobStore {
  loadingJob = false;
  loadingJobs = false;
  loading = false;
  uploading = false;
  job: Job | null = null;
  jobArray: Job[] = [];
  pagingParams = new PagingParams();
  pagination: Pagination | null = null;
  skillRegistry = new Map<number, Skill>();
  skillPredicate = new Map().set("skill", "all");
  skillFilter: string[] = [];
  filterDelay: any;
  sortJobsBy: string = "dateNewest";
  skillNames: SkillSearchItem[] = [];
  requiredSkills: Skill[] = [];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.skillFilter.slice(),
      () => {
        this.filterDelay = setTimeout(() => {
          this.pagingParams = new PagingParams();
          runInAction(() => (this.jobArray.length = 0));
          this.loadRequiredSkills();
        }, 500);
      }
    );

    reaction(
      () => this.sortJobsBy,
      () => {
        this.sortJobs();
      }
    );
  }

  get isEmployer() {
    return (
      store.userStore.isLoggedIn() &&
      this.job?.employer.userName === store.userStore.user?.userName
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setSkillPredicate = (value: string) => {
    this.skillFilter.includes(value)
      ? this.skillFilter.splice(this.skillFilter.indexOf(value), 1)
      : this.skillFilter.push(value);
    this.skillFilter.length > 0
      ? this.skillPredicate.set("skill", this.skillFilter.join(","))
      : this.skillPredicate.set("skill", "all");
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.skillPredicate.forEach((value, key) => {
      params.append(key, value);
    });

    return params;
  }

  resetState = () => {
    this.clearFilter();
    this.resetJob();
  };

  clearFilter = () => {
    this.skillFilter.length = 0;
    this.skillPredicate.set("skill", "all");
  };

  resetJob = () => (this.job = null);

  resetRequiredSkills = () => (this.requiredSkills.length = 0);

  loadJob = async (id: string) => {
    this.loadingJob = true;
    try {
      const job = await agent.Jobs.get(id);
      runInAction(() => {
        this.job = job;
        this.loadingJob = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingJob = false));
    }
  };

  loadJobs = async () => {
    this.loadingJobs = true;
    try {
      const result = await agent.Jobs.list(this.axiosParams);
      result.data.forEach((job) => {
        this.setJob(job);
      });
      this.sortJobs();
      this.setPagination(result.pagination);
      runInAction(() => (this.loadingJobs = false));
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingJobs = false));
    }
  };

  sortJobs = () => {
    if (this.sortJobsBy === "dateNewest") {
      this.jobArray.sort((j1, j2) =>
        j1.creationTime < j2.creationTime ? 1 : -1
      );
    } else if (this.sortJobsBy === "dateOldest") {
      this.jobArray.sort((j1, j2) =>
        j1.creationTime > j2.creationTime ? 1 : -1
      );
    }
  };

  private setJob = (job: Job) => {
    this.jobArray.push(job);
  };

  changeSorting = (sortBy: string) => {
    this.sortJobsBy = sortBy;
  };

  loadRequiredSkills = async () => {
    this.loading = true;
    try {
      const result = await agent.Skills.listJobRequired(this.axiosParams);
      if (this.skillRegistry.size > 0)
        runInAction(() => this.skillRegistry.clear());
      result.forEach((skill) => this.setSkill(skill));
      runInAction(() => (this.loading = false));
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  private setSkill = (skill: Skill) => {
    this.skillRegistry.set(skill.id, skill);
  };

  loadAllSkills = async () => {
    this.loading = true;
    try {
      const result = await agent.Skills.listAll();
      if (this.skillRegistry.size > 0)
        runInAction(() => this.skillRegistry.clear());
      result.forEach((skill) => this.setSkill(skill));
      runInAction(() => (this.loading = false));
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  getSkillNames = () => {
    this.skillNames.length = 0;
    const skills = Array.from(this.skillRegistry.values());
    skills.forEach((skill) => {
      if (
        this.requiredSkills &&
        !this.requiredSkills.some((jobSkill) => skill.name === jobSkill.name)
      )
        this.skillNames.push({ title: skill.name });
    });
    this.skillNames.sort((s1, s2) => {
      return s1.title >= s2.title ? 1 : -1;
    });
    return this.skillNames;
  };

  addRequiredSkill = (skill: Skill) => {
    if (this.requiredSkills) {
      this.requiredSkills.push(skill);
    }
  };

  removeRequiredSkill = (skill: Skill) => {
    if (this.requiredSkills) {
      this.requiredSkills = this.requiredSkills.filter((s) => s !== skill);
    }
    this.skillNames.push({
      title: skill.name,
    } as SkillSearchItem);
  };

  uploadFile = async (file: UserFile) => {
    this.uploading = true;
    try {
      const blob = await fetch(file.url).then((r) => r.blob());
      const response = await agent.Profiles.uploadFile(blob);
      const uploadedFile = response.data;
      return uploadedFile;
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  uploadJobAttachments = async (jobAttachments: UserFile[]) => {
    this.loading = true;
    try {
      await Promise.all(
        jobAttachments.map(async (attachment) => {
          if (attachment.url.startsWith("blob:")) {
            const response = await this.uploadFile(attachment);
            attachment.url = response!.url;
          }
        })
      );
      return jobAttachments;
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  addJob = async (
    { jobTitle, jobDescription }: JobFormValues,
    files: Map<string, UserFile>
  ) => {
    this.loading = true;
    try {
      const jobAttachments = await this.uploadJobAttachments(Array.from(files.values()));
      const job: Partial<Job> = {
        id: uuid(),
        title: jobTitle,
        description: jobDescription,
        attachments: jobAttachments,
        isActive: true,
        requiredSkills: this.requiredSkills,
      };
      console.log(job.id);

      await agent.Jobs.add(job);
      runInAction(() => {
        this.loading = false;
        history.push(`/jobs/${job.id}`);
      });
    } catch (error) {}
  };
}