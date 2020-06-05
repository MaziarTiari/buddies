import { ImageSourcePropType } from "react-native";
import { CategorizedInput } from "../../models/User/UserProfile";

export interface IActivity {

    ownerUserId: string;
    id: string;

    title: string;
    hobbies?: CategorizedInput[];
    startDate: number;
    endDate?: number;
    description: string;
    location: string;
    imageName: string; // TODO
    allowPublish?: boolean;

    memberUserIds?: string[];
    applicantUserIds?: string[];

    maxApplications?: number;
    applicationDeadline?: number;
    visibility: "public" | "friends" | "private";

    reqSex?: string;
    reqAge?: number;
    reqLanguage?: string[];
    reqLocation?: string;
    reqLocationRadius?: number;
    reqRelationshipState?: string;
    reqJob?: CategorizedInput[];

}

export const activities: IActivity[] = [
    {
        ownerUserId: "2",
        id: "1",
        title: "Mountain Bike",
        location: "Heidelberg, Philosophenweg",
        maxApplications: 6,
        imageName: "mountain-bike.jpg",
        startDate: new Date(2020, 26, 5, 6, 50).getTime() / 1000,
        endDate: new Date(2020, 26, 5, 16, 0).getTime() / 1000,
        visibility: "public",
        description: "Wir starten am Philosophenweg und fahren anschließend den Berg hoch bis zum Ende der Physikstraße",
        hobbies: [
            { category: "Sport", title: "Fahrrad" },
            { category: "Natur", title: "Erkunden" }
        ],
        allowPublish: true,
        memberUserIds: ["1", "2", "3"],
        applicantUserIds: ["4"],
        reqSex: "male",
        reqAge: 16,
        reqLocation: "Heidelberg",
        reqLocationRadius: 10,
        reqRelationshipState: "single",
        reqJob: [{ title: "Angewandte Informatik", category: "Student" }],
        applicationDeadline: new Date(2020, 25, 5, 18).getTime() / 1000,

    },
    {
        ownerUserId: "3",
        id: "2",
        title: "Mediation",
        location: "Worms, Hintergasse 13",
        imageName: "meditation.jpg",
        startDate: new Date(2020, 24, 5, 18, 0).getTime() / 1000,
        endDate: new Date(2020, 24, 5, 20, 0).getTime() / 1000,
        visibility: "public",
        description: "Gemeinsames Meditieren in einer Gruppe sorgt für maximales Entspannes.",
        hobbies: [
            { category: "Natur", title: "Wohlfühlen" }
        ],
        allowPublish: true,
        memberUserIds: ["1", "3"],
        applicantUserIds: ["3"],
        applicationDeadline: new Date(2020, 23, 5, 18).getTime() / 1000,

    },
];
