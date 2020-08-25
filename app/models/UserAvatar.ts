import { IImage } from "./Image";

export interface IUserAvatar {
    userId: string;
    username: string;
    firstname: string;
    lastname: string;
    avatar: IImage;
}