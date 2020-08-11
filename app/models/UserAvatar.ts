import { Image } from "./Image";

export interface UserAvatar {
    id: string;
    userId: string;
    username: string;
    firstname: string;
    surname: string;
    avatar: Image;
}