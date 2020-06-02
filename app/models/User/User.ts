export interface INewUser {
    phone: string;
    email: string;
    password: string;
}

export interface IUser extends INewUser {
    id: string;
    salt: string;
}

export interface IVerifyingUser {
    email: string;
    password: string;
}