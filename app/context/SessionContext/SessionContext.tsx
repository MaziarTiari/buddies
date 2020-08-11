import React, { createContext, useState, ReactNode } from "react";
import { initialState } from "./stateFrame";
import { IUserProfile } from "../../models/UserProfile";
import { ApiClient } from "../../api/ApiClient";
import { getServiceUrl } from "../../api/channels";
import { AxiosError } from "axios";
import { NOT_FOUND } from "http-status-codes";
// end import ////////////////////////////////////////////////////////////////

export const SessionContext = createContext(initialState);

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

    const [user, setUser] = useState(initialState.user);
    const [userProfile, setUserProfile] = useState(initialState.userProfile);
    const [activity, setActivity] = useState(initialState.activity);

    const userProfileApi = new ApiClient<IUserProfile>(
        { baseURL: getServiceUrl("UserProfiles") }
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
    }

    const value = {
        user,
        setUser,
        userProfile,
        setUserProfile,
        activity,
        setActivity,
        updateUserProfile
    };

    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
}
