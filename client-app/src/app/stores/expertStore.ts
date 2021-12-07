import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Profile, Skill } from "../models/profile";
import { SkillSearchItem } from "../models/search";
import { store } from "./store";

export default class ExpertStore {
  expertArray: Profile[] = [];
  skillRegistry = new Map<number, Skill>();
  loadingExperts = false;
  loadingSkills = false;
  loading = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  skillPredicate = new Map().set("skill", "all");
  skillFilter: string[] = [];
  filterDelay: NodeJS.Timeout = setTimeout(() => {}, 0);
  skillNames: SkillSearchItem[] = [];
  sortExpertsBy: string = "ratingHighest";

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.skillFilter.slice(),
      () => {
        this.filterDelay = setTimeout(() => {
          this.pagingParams = new PagingParams();
          runInAction(() => (this.expertArray.length = 0));
          this.loadUsedSkills();
        }, 500);
      }
    );

    reaction(
      () => this.sortExpertsBy,
      () => {
        this.pagingParams = new PagingParams();
        runInAction(() => (this.expertArray.length = 0));
        this.loadUsedSkills();
      }
    );
  }

  resetState = () => {
    this.clearFilter();
    this.resetSkillNames();
    this.resetExpertArray();
    this.resetSorting();
    this.resetPagination();
  };

  clearFilter = () => {
    this.skillFilter.length = 0;
    this.skillPredicate.set("skill", "all");
  };

  resetSkillNames = () => {
    this.skillNames.length = 0;
  };

  resetExpertArray = () => {
    this.expertArray.length = 0;
  };
  resetSorting = () => this.changeSorting("ratingHighest");
  resetPagination = () => {
    this.pagination = null;
    this.pagingParams = new PagingParams();
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
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

    params.append("sortBy", this.sortExpertsBy);

    return params;
  }

  loadExperts = async () => {
    this.loadingExperts = true;
    try {
      const result = await agent.Experts.list(this.axiosParams);
      console.log("balls");
      result.data.forEach((expert) => {
        this.setExpert(expert);
      });
      this.setPagination(result.pagination);
      runInAction(() => (this.loadingExperts = false));
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingExperts = false));
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  private setExpert = (expert: Profile) => {
    this.expertArray.push(expert);
  };

  changeSorting = (sortBy: string) => {
    this.sortExpertsBy = sortBy;
  };

  loadAllSkills = async () => {
    this.loadingSkills = true;
    try {
      const result = await agent.Skills.listAll();
      if (this.skillRegistry.size > 0)
        runInAction(() => this.skillRegistry.clear());
      result.forEach((skill) => this.setSkill(skill));
      runInAction(() => (this.loadingSkills = false));
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingSkills = false));
    }
  };

  loadUsedSkills = async () => {
    this.loadingSkills = true;
    try {
      const result = await agent.Skills.listUsed(this.axiosParams);
      if (this.skillRegistry.size > 0)
        runInAction(() => this.skillRegistry.clear());
      result.forEach((skill) => this.setSkill(skill));
      runInAction(() => (this.loadingSkills = false));
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingSkills = false));
    }
  };

  private setSkill = (skill: Skill) => {
    this.skillRegistry.set(skill.id, skill);
  };

  getSkillNames = () => {
    this.skillNames.length = 0;
    const skills = Array.from(this.skillRegistry.values());
    skills.forEach((skill) => {
      if (
        store.profileStore.profile &&
        !store.profileStore.profile.skills.some(
          (profileSkill) => skill.name === profileSkill.name
        )
      )
        this.skillNames.push({ title: skill.name });
    });
    this.skillNames.sort((s1, s2) => {
      return s1.title >= s2.title ? 1 : -1;
    });
    return this.skillNames;
  };
}
