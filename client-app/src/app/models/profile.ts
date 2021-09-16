import { User } from "./user";

export interface Profile {
  username: string;
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
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export interface Photo {
  id: string;
  url: string;
}

export interface UserFile {
  id: string;
  url: string;
  resourceType: string;
}

export interface Job {
  id: string;
  employer: string;
  requiredSkills: Skill[];
  additionalAttachments: string[];
  creationTime: Date;
  isActive: boolean;
  jobBids: JobBid[];
}

export interface Review {
  id: number;
  rating: number;
  description: string;
  creationDate: Date;
}

export interface Skill {
  id: number;
  name: string;
  expertCount: number;
}

export interface JobBid {
  id: number;
  bidder: string;
}

export interface Description {
  id: number;
  title: string;
  summary: string;
  formattedText: string;
}

export interface PortfolioItem {
  id: number;
  url: string;
  description: Description;
}

export interface EmploymentItem {
  id: number;
  employedFrom: Date;
  employedTo?: Date;
  description: Description;
}

export interface ExperienceItem {
  id: number;
  description: Description;
}

export interface EducationItem {
  id: number;
  facilityName: string;
  facilityLocation: string;
  fieldOfStudy: string;
  studyingFrom: Date;
  studyingTo?: Date;
}

export interface Certification {
  id: number;
  name: string;
  dateAcquired: Date;
  certificate: Photo;
}
