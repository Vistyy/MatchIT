import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Job, Skill } from "../models/profile";

export default class JobStore {
  loadingJob = false;
  loadingJobs = false;
  loading = false;
  job: Job | null = null;
  jobRegistry = new Map<string, Job>();
  pagingParams = new PagingParams();
  pagination: Pagination | null = null;
  skillRegistry = new Map<number, Skill>();
  skillPredicate = new Map().set("skill", "all");
  skillFilter: string[] = [];
  filterDelay: any;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.skillFilter.slice(),
      () => {
        this.filterDelay = setTimeout(() => {
          this.pagingParams = new PagingParams();
          runInAction(() => this.jobRegistry.clear());
          this.loadRequiredSkills();
        }, 500);
      }
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
    this.job = null;
  };

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
      this.setPagination(result.pagination);
      runInAction(() => (this.loadingJobs = false));
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingJobs = false));
    }
  };

  private setJob = (job: Job) => {
    this.jobRegistry.set(job.id, job);
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

  clearFilter = () => {
    this.skillFilter.length = 0;
    this.skillPredicate.set("skill", "all");
  };
}
