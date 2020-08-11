import { IImage } from "./Image";

export interface IUserAvatar {
    id: string;
    userId: string;
    username: string;
    firstname: string;
    surname: string;
    avatar: IImage;
}