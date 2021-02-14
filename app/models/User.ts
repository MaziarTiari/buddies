export interface IUserInfo {
    phone: string;
    email: string;
}
export interface IUser extends IUserInfo {
    id: string;
}

export interface INewUser extends IUserInfo {
    password: string;
}
export interface IUserCredentials {
    email: string;
    password: string;
}

export interface IChangePasswordRequestBody {
    currentPassword: string;
    newPassword: string;
}