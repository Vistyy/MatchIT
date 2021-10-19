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
  id: string;
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
  id: string;
  bidder: string;
}

export interface Description {
  id: string;
  title: string;
  summary: string;
  formattedText: string;
}

export interface PortfolioItem {
  id: string;
  url: string;
  description?: Description;
}

export interface EmploymentItem {
  id: string;
  employedFrom: Date;
  employedTo?: Date;
  description: Description;
}

export interface ExperienceItem {
  id: string;
  description: Description;
}

export interface EducationItem {
  id: string;
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
  certificate: Photo;
}
