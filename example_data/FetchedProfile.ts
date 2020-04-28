export interface IUser {
    id: number;
    username: string;
    email: string;
    phone: string;
    location: string;
    firstname?: string;
    lastname?: string;
    sex?: string;
    birthday?: Date;
    languages?: string[];
    info?: string;
    educationalInstitute?: string;
    company?: string;
    relationshipState?: string;
    jobs?: string[];
}