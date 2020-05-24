export interface INewUser {
    phone: string;
    email: string;
    password: string;
    salt: string;
}

export interface IUser extends INewUser {
    id: string;
}

export interface INewUserProfile {
    userId: string;
    firstname: string;
    lastname: string;
    city: string;
    birthDate: number;
    sex: string;
    languages?: string[];
    info?: string;
    educationalInstitute?: string;
    company?: string;
    relationshipState?: string;
    jobs?: Job[];
    hobbies?: CategorizedInput[];
	profileImage?: string;
	friends?: string[]
	groups?: string[]
}

export interface IUserProfile extends INewUserProfile {
    id: string;
}

interface CategorizedInput { category: string; title: string; }
interface Job extends CategorizedInput { institution?: string; }