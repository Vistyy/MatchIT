import { Job, JobBid } from "./job";
import { User } from "./user";

export interface Profile {
  userName: string;
  displayName: string;
  image?: Photo;
  bio?: string;
  location: string;
  dateJoined: Date;
  postedJobs: Job[];
  reviews: Review[];
  skills: Skill[];
  rating: number;
  portfolio: PortfolioItem[];
  employment: EmploymentItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  jobBids: JobBid[];
  isExpert: boolean;
}

export class Profile implements Profile {
  constructor(user: User) {
    this.userName = user.userName;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export interface Photo {
  id: string;
  url: string;
}

export interface Review {
  id: string;
  rating: number;
  description: string;
  creationDate: Date;
}

export interface Skill {
  id: number;
  name: string;
  count: number;
}

export interface Description {
  id: string;
  title: string;
  summary: string;
  formattedText: string;
}

export interface PortfolioItem {
  id: string;
  attachments: UserFile[];
  description: string;
}

export interface EmploymentItem {
  id: string;
  employedFrom: Date;
  employedTo?: Date;
  description: Description;
}

export interface EmploymentFormValues {
  employedFrom: Date;
  employedTo?: Date;
  companyName: string;
  companyPosition: string;
  jobDescription: string;
}

export interface ExperienceItem {
  id: string;
  description: Description;
}

export interface ExperienceFormValues {
  title: string;
  summary: string;
  formattedText: string;
}

export interface EducationItem {
  id: string;
  facilityName: string;
  facilityLocation: string;
  fieldOfStudy: string;
  studyingFrom: Date;
  studyingTo?: Date;
}

export interface EducationFormValues {
  facilityName: string;
  facilityLocation: string;
  fieldOfStudy: string;
  studyingFrom: Date;
  studyingTo?: Date;
}

export interface Certification {
  id: string;
  name: string;
  dateAcquired: Date;
}

export interface CertificationFormValues {
  certificateName: string;
  dateAcquired: Date;
}

export interface UserFile {
  id: string;
  url: string;
  resourceType: string;
}
