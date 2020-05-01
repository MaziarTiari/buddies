import { ImageSourcePropType } from "react-native";

export interface IActivity {
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
        id: 1,
        title: "Mountain Bike",
        location: "Heidelberg, Pholosophenweg",
        allowedApplyNumber: 6,
        imageName: "mountain-bike.jpg",
        membersUserIds: [1,2]
    },
    {
        id: 2,
        title: "Meditation",
        location: "Worms",
        allowedApplyNumber: 10,
        imageName: "meditation.jpg",
        membersUserIds: [1,2]
    }
]
