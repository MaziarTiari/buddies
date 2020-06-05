import React, { createContext, useState, ReactNode } from "react";
import { sessionContextInitialState } from "./stateFrame";
import { IUserProfile } from "../../models/User/UserProfile";
import { ApiClient } from "../../api/ApiClient";
import { getServiceUrl } from "../../api/channels";
import { AxiosError } from "axios";
import { NOT_FOUND } from "http-status-codes";

export const SessionContext = createContext(sessionContextInitialState);

export const SessionContextProvider = (props: { children: ReactNode }) => {
    const userProfileApi = 
        new ApiClient<IUserProfile>({baseURL: getServiceUrl("UserProfiles")});
    const [user, setUser] = useState(sessionContextInitialState.user);
    const [userProfile, setUserProfile] = useState(sessionContextInitialState.userProfile);
    const [activity, setActivity] = useState(sessionContextInitialState.activity);
    
    
    const updateUserProfile = (userProfile: IUserProfile) => {
        userProfileApi.Update<number, IUserProfile>(userProfile.id, userProfile)
        .then(() => setUserProfile(userProfile))
        .catch((error: AxiosError) => {
            if(error.response?.status === NOT_FOUND)
                alert("Benutzer konnte nicht gefunden werden");
            else 
                alert("Es gibt im moment ein Problem, bitte versuche später wieder!")
        })
    }
    
    const value = { 
        user, setUser, userProfile, setUserProfile, activity, setActivity, 
        updateUserProfile
    };
    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
}
