import { Profile, Skill, UserFile } from "./profile";

export interface Job {
    id: string;
    employer: Profile;
    requiredSkills: Skill[];
    title: string;
    description: string;
    attachments: UserFile[];
    creationTime: Date;
    isActive: boolean;
    jobBids: JobBid[];
  }
  
export interface JobFormValues {
    jobTitle: string;
    jobDescription: string;
}

  export interface JobBid {
    id: string;
    description: string;
    fee: number;
    bidder: Profile;
  }