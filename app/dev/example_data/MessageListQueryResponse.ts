import { IImage } from "../../models/Image";

export enum Relation {
    STRANGER,
    FRIEND,
    BLOCKED,
    GROUP,
}

export interface IChatPartner {
    username: string;
    memberUserId: string;
    chatId: string;
    displayName: string;
    //isOnline: boolean;
    unreadMessages: number;
    //relation: Relation;
    lastUpdate: number;
    avatar?: IImage;
}

// export const exampleResponse: IChatPartner[] = [
//     {
//         chatId: "1",
//         displayName: "Billy Wallace",
//         isOnline: true,
//         relation: 1,
//         unreadMessages: 0,
//         lastUpdate: new Date(2018, 12, 3, 12, 15),
//     },
//     {
//         chatId: "2",
//         displayName: "Dexter Williamson",
//         isOnline: true,
//         relation: 0,
//         unreadMessages: 5,
//         lastUpdate: new Date(2020, 3, 26, 18, 26),
//     },
//     {
//         chatId: "3",
//         displayName: "Oliver Williams",
//         isOnline: false,
//         relation: 0,
//         unreadMessages: 0,
//         lastUpdate: new Date(2020, 3, 17, 15, 1),
//     },
//     {
//         chatId: "4",
//         displayName: "Jose Peters",
//         isOnline: true,
//         relation: 1,
//         unreadMessages: 0,
//         lastUpdate: new Date(2020, 3, 25, 12, 16),
//     },
//     {
//         chatId: "5",
//         displayName: "Ewan Cole",
//         isOnline: false,
//         relation: 1,
//         unreadMessages: 0,
//         lastUpdate: new Date(2017, 1, 28, 23, 51),
//     },
//     {
//         chatId: "6",
//         displayName: "King Greer",
//         isOnline: false,
//         relation: 1,
//         unreadMessages: 0,
//         lastUpdate: new Date(2019, 5, 3, 1, 3),
//     },
//     {
//         chatId: "7",
//         displayName: "Rebecca Murray",
//         isOnline: false,
//         relation: 1,
//         unreadMessages: 0,
//         lastUpdate: new Date(2020, 2, 15, 17, 31),
//     },
//     {
//         chatId: "8",
//         displayName: "Lilliana Wood",
//         isOnline: false,
//         relation: 2,
//         unreadMessages: 0,
//         lastUpdate: new Date(2020, 3, 15, 8, 56),
//     },
//     {
//         chatId: "9",
//         displayName: "Jade Barrett",
//         isOnline: false,
//         relation: 1,
//         unreadMessages: 0,
//         lastUpdate: new Date(2020, 2, 29, 17, 9),
//     },
//     {
//         chatId: "10",
//         displayName: "Maddox Coleman",
//         isOnline: true,
//         relation: 0,
//         unreadMessages: 0,
//         lastUpdate: new Date(2020, 1, 18, 19, 42),
//     },
//     {
//         chatId: "11",
//         displayName: "Die Heidelberger",
//         isOnline: false,
//         relation: 3,
//         unreadMessages: 2,
//         lastUpdate: new Date(2020, 4, 1, 19, 42),
//     },
// ];
