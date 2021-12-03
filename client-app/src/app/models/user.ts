import { Photo } from "./profile";

export interface User {
  userName: string;
  displayName: string;
  token: string;
  image?: Photo;
  isExpert: boolean;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayname?: string;
  userName?: string;
}
