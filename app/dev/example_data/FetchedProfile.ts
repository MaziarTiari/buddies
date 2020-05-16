export interface IEmployment {
    institution: string;
    position: string;
}

export interface IHobby {
    category: string;
    name: string;
}

export interface IProfile {
    id: number;
    username: string;
    email: string;
    phone: string;
    location: string;
    firstname: string;
    lastname: string;
    sex: string;
    birthday: Date;
    languages?: string[];
    info?: string;
    relationshipState?: string;
    employments?: IEmployment[];
    hobbies?: IHobby[];
    friends?: number[];
    groups?: number[];
    profile_pictures?: string[];
}
