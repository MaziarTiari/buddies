import React, { createContext, useState, ReactNode } from "react";
import { IUserProfile } from "../../models/UserProfile";
import { ApiClient } from "../../api/ApiClient";
import { getServiceUrl } from "../../api/channels";
import { AxiosError } from "axios";
import { NOT_FOUND } from "http-status-codes";
import { IActivity } from "../../models/Activity";
import { IUser } from "../../models/User";
import { ISessionContextState, initialState } from "./stateFrame";
// end import ////////////////////////////////////////////////////////////////

export const SessionContext = createContext<ISessionContextState>(initialState);

/*****************************************************************************
 * Provides context of users current session
 * @param props consumer components as children
 * @returns object {    
 *      user: current user,     
 *      setUser: sets current user,     
 *      userProfile: profile of current user,   
 *      setUserProfile: sets profile of current user,   
 * }
 * 
 */
export function SessionContextProvider(props: { children: ReactNode }) {

    const [user, setUser] = useState<IUser>(initialState.user);
    const [userProfile, setUserProfile] = useState<IUserProfile>(initialState.userProfile);
    const [activity, setActivity] = useState<IActivity>(initialState.activity);
    const [activityList, setActivityList] = useState<IActivity[]>(initialState.activityList);

    const userProfileApi = new ApiClient<IUserProfile>(
        { baseURL: getServiceUrl("UserProfiles") }
    );

    const activityApi = new ApiClient<IActivity>(
        { baseURL: getServiceUrl("Activities") }
    );

    const updateUserProfile = (updatedUserProfile: IUserProfile) => {
        userProfileApi.Update<string, IUserProfile>(updatedUserProfile.id, updatedUserProfile)
            .then(() => setUserProfile(updatedUserProfile))
            .catch((error: AxiosError) => {
                if (error.response?.status === NOT_FOUND)
                    alert("Benutzer konnte nicht gefunden werden");
                else
                    alert("Es gibt im moment ein Problem, bitte versuche später wieder!")
            })
    };

    const fetchActivityList = () => {
        activityApi.GetAll<IActivity[]>()
            .then((response: IActivity[]) => setActivityList(response))
            .catch((error: AxiosError) => console.log(error));
    };

    const value: ISessionContextState = {
        user,
        setUser,
        userProfile,
        setUserProfile,
        activity,
        setActivity,
        updateUserProfile,
        activityList,
        fetchActivityList
    };

    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
}
