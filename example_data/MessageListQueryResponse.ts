interface IMessageList {
    uuid: string;
    displayName: string;
    isOnline: boolean;
    unreadMessages: number;
    relation: number;
    lastMessage: Date;
}

export const response: IMessageList[] = [
    {
        uuid: "1",
        displayName: "Billy Wallace",
        isOnline: true,
        relation: 1,
        unreadMessages: 0,
        lastMessage: new Date(2018, 12, 3, 12, 15),
    },
    {
        uuid: "2",
        displayName: "Dexter Williamson",
        isOnline: true,
        relation: 0,
        unreadMessages: 5,
        lastMessage: new Date(2020, 3, 26, 18, 26),
    },
    {
        uuid: "3",
        displayName: "Oliver Williams",
        isOnline: false,
        relation: 0,
        unreadMessages: 0,
        lastMessage: new Date(2020, 3, 17, 15, 1),
    },
    {
        uuid: "4",
        displayName: "Jose Peters",
        isOnline: true,
        relation: 1,
        unreadMessages: 0,
        lastMessage: new Date(2020, 3, 25, 12, 16),
    },
    {
        uuid: "5",
        displayName: "Ewan Cole",
        isOnline: false,
        relation: 1,
        unreadMessages: 0,
        lastMessage: new Date(2017, 1, 28, 23, 51),
    },
    {
        uuid: "6",
        displayName: "King Greer",
        isOnline: false,
        relation: 1,
        unreadMessages: 0,
        lastMessage: new Date(2019, 5, 3, 1, 3),
    },
    {
        uuid: "7",
        displayName: "Rebecca Murray",
        isOnline: false,
        relation: 1,
        unreadMessages: 0,
        lastMessage: new Date(2020, 2, 15, 17, 31),
    },
    {
        uuid: "8",
        displayName: "Lilliana Wood",
        isOnline: false,
        relation: 2,
        unreadMessages: 0,
        lastMessage: new Date(2020, 3, 15, 8, 56),
    },
    {
        uuid: "9",
        displayName: "Jade Barrett",
        isOnline: false,
        relation: 1,
        unreadMessages: 0,
        lastMessage: new Date(2020, 2, 29, 17, 9),
    },
    {
        uuid: "10",
        displayName: "Maddox Coleman",
        isOnline: true,
        relation: 0,
        unreadMessages: 0,
        lastMessage: new Date(2020, 1, 18, 19, 42),
    },
];
