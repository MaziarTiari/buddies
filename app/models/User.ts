export interface INewUser {
    phone: string;
    email: string;
    password: string;
}

export interface IUser extends INewUser {
    id: string;
    salt: string;
}

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
    jobs?: CategorizedInput[];
    hobbies?: CategorizedInput[];
    profileImage?: string;
    friends?: string[];
    groups?: string[];
}

export interface IUserProfile extends INewUserProfile {
    id: string;
}

export interface CategorizedInput {
    category: string;
    title: string;
    institution?: string;
}

export interface IVerifyingUser {
    email: string;
    password: string;
}