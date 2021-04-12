import { MutableRefObject, useRef } from "react";
import { IActivity, IForeignActivity, INewActivity } from "../models/Activity";
import { IUserAvatar } from "../models/UserAvatar";
import { apiRoutes } from "./channels";
import useHttpClient from "./httpClient";

interface ReturnValue {
    getUsersActivities: () => Promise<IActivity[]>;
    getForeignActivities: () => Promise<IForeignActivity[]>;
    updateActivity: (activity: IActivity)  => Promise<void>;
    createActivity: (activity: INewActivity) => Promise<IActivity>;
    applyActivity: (activityId: string) => Promise<void>;
    hideActivity: (activityId: string) => Promise<void>;
    getActivityMembers: (activityId: string, memberUserIds: string[]) => (
        Promise<IUserAvatar[]>
    );
    getActivityApplicants: (activityId: string, applicantUserIds: string[]) => (
        Promise<IUserAvatar[]>
    );
    acceptApplications: (activityId: string, applicantIds: string[]) => Promise<void>;
    rejectAcpplications: (activityId: string, applicantIds: string[]) => Promise<void>;
}

export function useActivityClient(
    token: MutableRefObject<string>, 
    onExpiredToken: () => Promise<string>
) : ReturnValue {
    
    const httpClient = useHttpClient<IActivity>({
        config: {baseURL: apiRoutes.activities()}, 
        token,
        onExpiredToken
    });

    const getUsersActivities = (): Promise<IActivity[]> => (
        httpClient.getMany<IActivity[]>(apiRoutes.activities("my-activities"))
    );

    const getActivityOffers = (): Promise<IForeignActivity[]> => (
        httpClient.getMany<IForeignActivity[]>(apiRoutes.activities("offers"))
    );

    const updateActivity = (activity: IActivity): Promise<void> => (
        httpClient.update<void, IActivity>(activity)
    );

    const createActivity = (activity: INewActivity): Promise<IActivity> => (
        httpClient.create<IActivity, INewActivity>(activity)
    );

    const applyToActivity = (activityId: string): Promise<void> => (
        httpClient.post<void, string>(apiRoutes.activities("apply/"), activityId)
    );

    const hideActivity = (activityId: string): Promise<void> => (
        httpClient.post<void, string>(apiRoutes.activities("hide/"), activityId)
    );

    const getActivityMembers = (
        activityId: string, 
        memberUserIds: string[]
    ): Promise<IUserAvatar[]> => (
        httpClient.post<IUserAvatar[], string[]>(
            apiRoutes.activities("members/") + activityId, 
            memberUserIds
        )
    );

    const getActivityApplicants = (
        activityId: string, 
        applicantUserIds: string[]
    ): Promise<IUserAvatar[]> => (
        httpClient.post<IUserAvatar[], string[]>(
            apiRoutes.activities("applicants/") + activityId,
            applicantUserIds
        )
    );

    const acceptApplications = (
        activityId: string, 
        applicantIds: string[]
    ): Promise<void> => (
        httpClient.post<void, string[]>(
            apiRoutes.activities("accept/") + activityId,
            applicantIds
        )
    );

    const rejectAcpplications = (
        activityId: string, 
        applicantIds: string[]
    ): Promise<void> => (
        httpClient.post<void, string[]>(
            apiRoutes.activities("reject/") + activityId,
            applicantIds
        )
    );

    return ({
        acceptApplications,
        applyActivity: applyToActivity,
        createActivity,
        getActivityApplicants,
        getActivityMembers,
        getForeignActivities: getActivityOffers,
        getUsersActivities,
        hideActivity,
        rejectAcpplications,
        updateActivity,
    })
}
