import { ImageSourcePropType } from "react-native";

export interface IActivity {
    ownerUserId: number;
    id: number;
    title: string;
    location: string;
    allowedApplyNumber: number;
    membersUserIds?: number[];
    subjects?: string[];
    imageName: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    startTime?: Date;
    endTime?: Date;
    allowPublish?: boolean;
    applyCriteria?: ActivityApplyCriteria;
}

export interface ActivityApplyCriteria {
    ids?: number[];
    excludedIds?: number[];
    location?: string;
    languages?: string[];
    educationalInstitutes?: string[];
    companies?: string[];
    sex?: string[];
    birthdays?: Date[];
    relationshipStates?: string[];
    jobs?: string[];
}

export const activities: IActivity[] = [
    {
        ownerUserId: 2,
        id: 1,
        title: "Mountain Bike",
        location: "Heidelberg, Pholosophenweg",
        allowedApplyNumber: 6,
        imageName: "mountain-bike.jpg",
        membersUserIds: [1, 2],
        startDate: new Date(2020, 26, 5, 6, 50),
        endDate: new Date(2020, 26, 5, 16, 0),
    },
    {
        ownerUserId: 1,
        id: 2,
        title:
            "Meditation mit einem sehr langen Text als Titel der dann evtl abgeschnitten wird",
        location: "Worms",
        allowedApplyNumber: 10,
        imageName: "meditation.jpg",
        membersUserIds: [1, 2],
    },
    {
        ownerUserId: 1,
        id: 3,
        title: "kleiner Text",
        location: "Worms",
        allowedApplyNumber: 3,
        imageName: "meditation.jpg",
        membersUserIds: [1, 2],
    },
];
