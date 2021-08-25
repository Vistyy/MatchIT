import { Photo } from "./profile";

export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: Photo;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayname?: string;
    username?: string
}