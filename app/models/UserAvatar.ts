import { IImage } from "./Image";

export const defaultUserAvatar: IUserAvatar = {
    avatar: {base64: "", height: 0, width: 0},
    firstname: "",
    lastname: "",
    userId: "",
    username: "",
}
export interface IUserAvatar {
    userId: string;
    username: string;
    firstname: string;
    lastname: string;
    avatar: IImage;
}