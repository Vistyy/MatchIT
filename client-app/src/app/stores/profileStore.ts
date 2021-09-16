import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile, Skill } from "../models/profile";
import { SkillSearchItem } from "../models/search";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if (store.userStore.user?.username === this.profile?.username) {
      return store.userStore.user?.username === this.profile?.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile && store.userStore.user) {
          store.userStore.setImage(photo);
          this.profile.image = photo;
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.image = undefined;
          this.loading = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  uploadFile = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadFile(file);
      const userFile = response.data;
      runInAction(() => this.uploading = false);
    } catch(error) {
      console.log(error);
      runInAction(() => this.uploading = false);
    }
  }

  updateProfile = async (profile: Partial<Profile>) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (
          profile.displayName &&
          profile.displayName !== store.userStore.user?.displayName
        ) {
          store.userStore.setDisplayName(profile.displayName);
        }
        this.profile = { ...this.profile, ...(profile as Profile) };
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  becomeExpert = async (profile: Partial<Profile>) => {
    this.loading = true;
    try {
      await agent.Profiles.becomeExpert(profile);
      runInAction(() => {
        this.profile = { ...this.profile, ...(profile as Profile) };
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  addSkill = (skill: Skill) => {
    if (this.profile) this.profile.skills.push(skill);
  };

  removeSkill = (skill: Skill) => {
    if (this.profile)
      this.profile.skills = this.profile.skills.filter((s) => s !== skill);
    store.expertStore.skillNames.push({ title: skill.name } as SkillSearchItem);
  };

  
}
