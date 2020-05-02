export interface IChatMessage {
    uuid: string;
    senderUuid: string;
    senderDisplayName: string;
    message: string;
    date: Date;
}

export const exampleResponse: IChatMessage[] = [
    {
        uuid: "1",
        senderUuid: "1",
        senderDisplayName: "Franz Kafka",
        message: "Hallo!",
        date: new Date(2018, 3, 3, 15, 13),
    },
    {
        uuid: "2",
        senderUuid: "1",
        senderDisplayName: "Franz Kafka",
        message: "Hallo noch da??",
        date: new Date(2018, 3, 3, 15, 14),
    },
    {
        uuid: "3",
        senderUuid: "2",
        senderDisplayName: "Mona Lisa",
        message: "Nerv jetzt bitte nicht, ich bin wirklich beschäftigt!!!!",
        date: new Date(2018, 3, 3, 15, 32),
    },
];
