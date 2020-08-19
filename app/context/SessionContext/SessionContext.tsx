import React, { createContext, useState, ReactNode } from "react";
import { IUserProfile, INewUserProfile } from "../../models/UserProfile";
import { ApiClient } from "../../api/ApiClient";
import { getServiceUrl } from "../../api/channels";
import { AxiosError } from "axios";
import { NOT_FOUND } from "http-status-codes";
import { IActivity } from "../../models/Activity";
import { IUser, INewUser } from "../../models/User";
import { ISessionContextState, initialState, AuthState } from "./stateFrame";
import UserApi from "../../api/User/UserApi";
// end import ////////////////////////////////////////////////////////////////

export const SessionContext = createContext<ISessionContextState>(initialState);

const userApi = new UserApi(
    { baseURL: getServiceUrl("Users") }
);

const userProfileApi = new ApiClient<IUserProfile>(
    { baseURL: getServiceUrl("UserProfiles") }
);

const activityApi = new ApiClient<IActivity>(
    { baseURL: getServiceUrl("Activities") }
);

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

    // Session
    const [authState, setAuthState] = useState<AuthState>(AuthState.UNAUTHORIZED);
    const [user, setUser] = useState<IUser>(initialState.user);
    const [userProfile, setUserProfile] = useState<IUserProfile>(initialState.userProfile);
    const [activity, setActivity] = useState<IActivity>(initialState.activity);
    const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
    const [userIsEditingProfile, setUserIsEditingProfile] = useState<boolean>(initialState.userIsEditingProfile);
    const [userIsEditingActivity, setUserIsEditingActivity] = useState<boolean>(initialState.userIsEditingActivity);

    // Temporary Backups
    const [userProfileBackup, setUserProfileBackup] = useState<IUserProfile>(initialState.userProfile);
    const [activityBackup, setActivityBackup] = useState<IActivity>(initialState.activity);

    // Error Messages
    const [createUserProfileError, setCreateUserProfileError] = useState<string | undefined>(undefined);
    const [createUserError, setCreateUserError] = useState<string | undefined>(undefined);
    const [loginUserError, setLoginUserError] = useState<string | undefined>(undefined);

    const createUser = (createdUser: INewUser) => {
        setIsLoading(true);
        userApi.Create<IUser, INewUser>(createdUser)
            .then((user: IUser) => {
                setCreateUserError(undefined);
                setUser(user);
                setAuthState(AuthState.AUTHORIZED_WITHOUT_PROFILE);
            })
            .catch((axiosError: AxiosError) => {
                console.log(axiosError);
                setCreateUserError("Error") // TODO Select Error Message
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const loginUser = (email: string, password: string) => {
        setIsLoading(true);
        userApi.VerifyUser({ email: email, password: password })
            .then((user: IUser) => {
                setLoginUserError(undefined);
                setUser(user);
                userProfileApi.Get<IUserProfile>(user.id)
                    .then((userProfile: IUserProfile) => {
                        setUserProfile(userProfile);
                        setAuthState(AuthState.AUTHORIZED);
                    })
                    .catch((axiosError: AxiosError) => {
                        setAuthState(AuthState.AUTHORIZED_WITHOUT_PROFILE);
                    });
            })
            .catch((axiosError: AxiosError) => {
                setLoginUserError("Error"); // TODO Select Error Message
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const createUserProfile = (createdUserProfile: INewUserProfile) => {
        setIsLoading(true);
        userProfileApi.Create<IUserProfile, INewUserProfile>(createdUserProfile)
            .then((userProfile: IUserProfile) => {
                setCreateUserProfileError(undefined);
                setUserProfile(userProfile);
                setAuthState(AuthState.AUTHORIZED);
            })
            .catch((axiosError: AxiosError) => {
                setCreateUserProfileError("Error"); // TODO Select Error Message
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    const updateUserProfile = (updatedUserProfile: IUserProfile) => {
        setIsLoading(true);
        userProfileApi.Update<string, IUserProfile>(updatedUserProfile.id, updatedUserProfile)
            .then(() => setUserProfile(updatedUserProfile))
            .catch((error: AxiosError) => {
                if (error.response?.status === NOT_FOUND)
                    alert("Benutzer konnte nicht gefunden werden");
                else
                    alert("Es gibt im moment ein Problem, bitte versuche später wieder!")
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const updateActivity = (updatedActivity: IActivity) => {
        setIsLoading(true);
        activityApi.Update<string, IActivity>(updatedActivity.id, updatedActivity)
            .then(() => setActivity(updatedActivity))
            .catch((error: AxiosError) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    const createActivity = (createdActivity: IActivity) => {
        setIsLoading(true);
        activityApi.Create<IActivity>(createdActivity)
            .then((activity: IActivity) => setActivity(activity))
            .catch((error: AxiosError) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    const startEditingProfile = () => {
        if (userIsEditingProfile) return;
        setUserProfileBackup({ ...userProfile });
        setUserIsEditingProfile(true);
    };

    const saveEditingProfile = () => {
        if (!userIsEditingProfile) return;
        updateUserProfile({ ...userProfile });
        setUserIsEditingProfile(false);
    };

    const cancelEditingProfile = () => {
        if (!userIsEditingProfile) return;
        setUserProfile({ ...userProfileBackup });
        setUserIsEditingProfile(false);
    };

    const startEditingActivity = () => {
        if (userIsEditingActivity) return;
        setActivityBackup({ ...activity });
        setUserIsEditingActivity(true);
    };

    const saveEditingActivity = () => {
        if (!userIsEditingActivity) return;
        if (activity.id !== "") updateActivity({ ...activity });
        else createActivity({ ...activity });
        setUserIsEditingActivity(false);
    };

    const cancelEditingActivity = () => {
        if (!userIsEditingActivity) return;
        setActivity({ ...activityBackup });
        setUserIsEditingActivity(false);
    };

    const value: ISessionContextState = {
        user,
        setUser,
        userProfile,
        setUserProfile,
        activity,
        setActivity,
        isLoading,
        createUser,
        createUserError,
        loginUser,
        loginUserError,
        createUserProfile,
        createUserProfileError,
        authState,
        setAuthState,
        userIsEditingProfile,
        startEditingProfile,
        saveEditingProfile,
        cancelEditingProfile,
        userIsEditingActivity,
        startEditingActivity,
        saveEditingActivity,
        cancelEditingActivity,
    };

    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
}
