import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {
  AccountLinksFormValues,
  Certification,
  CertificationFormValues,
  EducationFormValues,
  EducationItem,
  EmploymentFormValues,
  EmploymentItem,
  ExperienceFormValues,
  ExperienceItem,
  Photo,
  PortfolioItem,
  Profile,
  Skill,
  UserFile,
} from "../models/profile";
import { SkillSearchItem } from "../models/search";
import { store } from "./store";
import { v4 as uuid } from "uuid";

export default class ProfileStore {
  profile: Profile | null = null;
  editedProfile: Profile | null = null;
  loadingProfile = false;
  updatingProfile = false;
  loadingLinks = false;
  uploading = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if (store.userStore.user?.userName === this.profile?.userName) {
      return store.userStore.user?.userName === this.profile?.userName;
    }
    return false;
  }

  resetState = () => {
    this.profile = null;
    this.editedProfile = null;
  };

  startProfileEditing = () => {
    this.editedProfile = {...this.profile!};
  }

  loadProfile = async (userName: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(userName);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  uploadProfilePhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadProfilePhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile && store.userStore.user) {
          store.userStore.setImage(photo);
          this.profile.photo = photo;
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
          this.profile.photo = undefined;
          this.loading = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  addCV = async (file: any) => {
    this.uploading = true;
    try {
      const cv: UserFile = {
        id: uuid(),
        resourceType: file.type,
        url: file.preview,
      };
      const response = await store.fileStore.uploadFile(cv);
      cv.id = response!.id;
      cv.url = response!.url;
      await agent.Profiles.addCV(cv);
      runInAction(() => {
        this.profile!.cv = cv;
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  uploadTempPortfolioFiles = async (portfolioItems: PortfolioItem[]) => {
    this.loading = true;
    try {
      await Promise.all(
        portfolioItems.map(async (item) => {
          await Promise.all(
            item.attachments.map(async (attachment) => {
              if (attachment.url.startsWith("blob:")) {
                const response = await store.fileStore.uploadFile(attachment);
                attachment = response!;
              }
            })
          );
        })
      );
      runInAction(() => (this.loading = false));
      return portfolioItems;
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  updateProfile = async (editedProfile: Partial<Profile>) => {
    this.updatingProfile = true;
    try {
      const uploadedPortfolio = await this.uploadTempPortfolioFiles(
        editedProfile.portfolio!
      );
      runInAction(() => (editedProfile.portfolio = uploadedPortfolio));
      await agent.Profiles.updateProfile(editedProfile);
      runInAction(() => {
        this.profile = { ...this.profile, ...(editedProfile as Profile) };
        this.updatingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.updatingProfile = false));
    }
  };

  addAccountLinks = async ({
    githubProfileUrl,
    linkedInProfileUrl,
  }: AccountLinksFormValues) => {
    this.loadingLinks = true;
    try {
      const profile: Partial<Profile> = {
        githubProfileUrl,
        linkedInProfileUrl,
      };
      await agent.Profiles.addAccountLinks(profile);
      runInAction(() => {
        this.profile = { ...this.profile, ...(profile as Profile) };
        this.loadingLinks = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  addSkill = (skill: Skill) => {
    if (this.editedProfile) {
      this.editedProfile.skills.push(skill);
    }
  };

  removeSkill = (skill: Skill) => {
    if (this.editedProfile) {
      this.editedProfile.skills = this.editedProfile.skills.filter((s) => s !== skill);
    }
    store.expertStore.skillNames.push({
      title: skill.name,
    } as SkillSearchItem);
  };

  addPortfolioItem = (files: Map<string, any>, description: string) => {
    const portfolioFiles: UserFile[] = [];
    files.forEach((file) => portfolioFiles.push(file));
    const portfolioItem: PortfolioItem = {
      id: uuid(),
      attachments: portfolioFiles,
      description: description,
    };
    this.editedProfile?.portfolio.push({ ...portfolioItem });
  };

  addEmploymentItem = ({
    employedFrom,
    employedTo,
    companyName,
    companyPosition,
    jobBulletList: jobBulletPoints,
  }: EmploymentFormValues) => {
    const employmentItem: EmploymentItem = {
      id: uuid(),
      employedFrom,
      employedTo,
      description: {
        id: uuid(),
        title: companyName,
        summary: companyPosition,
        bulletPoints: jobBulletPoints,
      },
    };
    this.editedProfile?.employment.push(employmentItem);
  };

  addExperienceItem = ({
    title,
    summary,
    bulletList: bulletPoints,
  }: ExperienceFormValues) => {
    const experienceItem: ExperienceItem = {
      id: uuid(),
      description: { id: uuid(), title, summary, bulletPoints: bulletPoints },
    };
    this.editedProfile?.experience.push(experienceItem);
  };

  addEducationItem = ({
    facilityName,
    facilityLocation,
    fieldOfStudy,
    studyingFrom,
    studyingTo,
  }: EducationFormValues) => {
    const educationItem: EducationItem = {
      id: uuid(),
      facilityName,
      facilityLocation,
      fieldOfStudy,
      studyingFrom,
      studyingTo,
    };
    this.editedProfile?.education.push(educationItem);
  };

  addCertification = ({
    certificateName,
    dateAcquired,
  }: CertificationFormValues) => {
    const certification: Certification = {
      id: uuid(),
      name: certificateName,
      dateAcquired,
    };
    this.editedProfile?.certifications.push(certification);
  };
}
