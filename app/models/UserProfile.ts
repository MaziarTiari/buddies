import { ICategorizedInput } from "./CategorizedInput";

export interface INewUserProfile {
    userId: string;
    username: string;
    firstname: string;
    lastname: string;
    city: string;
    birthDate: number;
    sex: string;
    languages?: string[];
    info?: string;
    relationshipState?: string;
    jobs?: ICategorizedInput[];
    hobbies?: ICategorizedInput[];
    profileImage?: string;
    friends?: string[];
    groups?: string[];
}

export interface IUserProfile extends INewUserProfile {
    id: string;
}

export interface IGetUserAvatarsRequest {
    userIds: string[];
}