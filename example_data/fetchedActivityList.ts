import { ImageSourcePropType } from "react-native";

export interface IActivity {
    id: number;
    title: string;
    location: string;
    allowedApplyNumber: number;
    membersUserIds?: number[];
    subjects?: string[];
    imagePath?: ImageSourcePropType;
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
        imagePath: {uri: 'https://wallpaperaccess.com/full/28991.jpg'},
        membersUserIds: [1,2]
    },
    {
        id: 2,
        title: "Meditation",
        location: "Worms",
        allowedApplyNumber: 10,
        imagePath: {
            uri: 'https://www.engelmagazin.de/wp-content/uploads/2019/11/' +
                  'michaela-merten-meditation-achtsamkeit-veraenderung-660x330.jpg'},
        membersUserIds: [1,2]
    }
]
