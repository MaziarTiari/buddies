import { IActivity, IForeignActivity } from "../../models/Activity";

export type ContextActivity = IActivity | IForeignActivity;

export interface ActivityContextModel {
    ownActivities: Array<IActivity>;
    foreignActivities: Array<IForeignActivity>;
    isLoadingOwn: boolean;
    isLoadingForeign: boolean;
    unhandledApplications: number;
    updateOwnActivity: (activity: IActivity) => void;
    fetchOwnActivities: () => void;
    fetchForeignActivities: () => void;
    hideActivity: (activityId: string) => void;
    applyToActivity: (activityId: string) => void;
}

export const activityContextModel: ActivityContextModel = {
    ownActivities: [],
    foreignActivities: [],
    isLoadingOwn: false,
    isLoadingForeign: false,
    unhandledApplications: 0,
    updateOwnActivity: () => console.warn('updateActivity() not implemented!'),
    fetchOwnActivities: () =>
        console.warn('fetchOwnActivities() not implemented!'),
    fetchForeignActivities: () =>
        console.warn('fetchForeignActivities() not implemented!'),
    hideActivity: () =>
        console.warn('removeForeignActivity() not implemented!'),
    applyToActivity: () => console.warn('removeOwnActivity() not implemented!')
};