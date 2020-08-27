import React, { createContext, useState, ReactNode, useMemo } from "react";
import { IUserProfile, INewUserProfile } from "../../models/UserProfile";
import { userProfileApi, activityApi } from "../../api/ApiClient";
// import { baseUrl, hubs } from "../../api/channels";
import { AxiosError } from "axios";
import { NOT_FOUND } from "http-status-codes";
import { IActivity } from "../../models/Activity";
import { IUser, INewUser } from "../../models/User";
import { ISessionContextState, initialState as initState, AuthState } from "./stateFrame";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { userApi } from "../../api/User/UserApi";
import { baseUrl, hubs } from "../../api/channels";
import { IPhotoGallery, IProfileImage } from "../../models/PhotoGallery";
import { galleryApi } from "../../api/GalleryApi";
// end import ////////////////////////////////////////////////////////////////

export const SessionContext = createContext<ISessionContextState>(initState);

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

    const userHubConnection = useMemo(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(baseUrl + hubs.user)
            .configureLogging(LogLevel.Information)
            .build();

        connection.start()
            .then(res => console.log("connection with userHub started!"))
            .catch(err => console.error("Could not connect to userHub! ", err));
        return connection;
    }, [])

    // Session
    const [authState, setAuthState] = useState<AuthState>(AuthState.UNAUTHORIZED);

    const [user, setUser] = useState<IUser>(initState.user);

    const [userProfile, setUserProfile] = useState<IUserProfile>(initState.userProfile);

    const [gallery, setGallery] = useState<IPhotoGallery>(initState.gallery);

    const [activity, setActivity] = useState<IActivity>(initState.activity);

    const [isLoading, setIsLoading] = useState<boolean>(initState.isLoading);

    const [errorMessage, setErrorMessage] = useState<string | undefined>(initState.errorMessage)

    const [
        userIsEditingProfile,
        setUserIsEditingProfile] = useState<boolean>(initState.userIsEditingProfile);

    const [
        userIsEditingActivity,
        setUserIsEditingActivity] = useState<boolean>(initState.userIsEditingActivity);

    // Temporary Backups
    const [
        userProfileBackup,
        setUserProfileBackup] = useState<IUserProfile>(initState.userProfile);

    const [
        activityBackup,
        setActivityBackup] = useState<IActivity>(initState.activity);

    const createUser = (createdUser: INewUser) => {
        setIsLoading(true);
        userApi.Create<IUser, INewUser>(createdUser)
            .then((user: IUser) => {
                setUser(user);
                setAuthState(AuthState.AUTHORIZED_WITHOUT_PROFILE);
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const loginUser = (email: string, password: string) => {
        setIsLoading(true);
        let loggedInUser;
        userApi.VerifyUser({ email: email, password: password })
            .then((user: IUser) => {
                loggedInUser = user;
                userProfileApi.Get<IUserProfile>(user.id)
                    .then((userProfile: IUserProfile) => {
                        setUserProfile(userProfile);
                        setAuthState(AuthState.AUTHORIZED);
                    })
                    .catch((axiosError: AxiosError) => {
                        setAuthState(AuthState.AUTHORIZED_WITHOUT_PROFILE);
                    });
                setUser(loggedInUser);
                userHubConnection.invoke("addToUserGroup", loggedInUser.id)
                    .then(res => "Added to User Group")
                    .catch(err => "Could not Add to User Group");
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const createUserProfile = (createdUserProfile: INewUserProfile) => {
        setIsLoading(true);
        userProfileApi.Create<IUserProfile, INewUserProfile>(createdUserProfile)
            .then((userProfile: IUserProfile) => {
                setUserProfile(userProfile);
                return galleryApi.Create<IPhotoGallery>({ id: "", userId: userProfile.userId, images: [] })
            })
            .then((gallery: IPhotoGallery) => {
                setAuthState(AuthState.AUTHORIZED);
                setGallery(gallery);
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    const updateUserProfile = (updatedUserProfile: IUserProfile) => {
        setIsLoading(true);
        userProfileApi.Update<string, IUserProfile>(updatedUserProfile.id, updatedUserProfile)
            .then(() => {
                setUserProfile(updatedUserProfile)
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const fetchUserProfile = (userId: string) => {
        if (userProfile.userId === userId) return;
        setIsLoading(true);
        userProfileApi.Get<IUserProfile>(userId)
            .then((userProfile: IUserProfile) => {
                setUserProfile(userProfile);
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const fetchGallery = (userId: string) => {
        if (gallery.userId === userId) return;
        setGallery(initState.gallery)
        setIsLoading(true);
        galleryApi.Get<IPhotoGallery>(userId)
            .then((gallery: IPhotoGallery) => {
                setGallery(gallery);
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const uploadToGallery = (image: IProfileImage) => {
        if (gallery.userId !== user.id) return;
        setIsLoading(true);
        galleryApi.UploadImage(image, gallery.id)
            .then(() => {
                setGallery({ ...gallery, images: [...gallery.images, image] });
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const updateActivity = (updatedActivity: IActivity) => {
        setIsLoading(true);
        activityApi.Update<string, IActivity>(updatedActivity.id, updatedActivity)
            .then(() => setActivity(updatedActivity))
            .catch((error: AxiosError) => setErrorMessage(error.message))
            .finally(() => setIsLoading(false));
    };

    const createActivity = (createdActivity: IActivity) => {
        setIsLoading(true);
        activityApi.Create<IActivity>(createdActivity)
            .then((activity: IActivity) => setActivity(activity))
            .catch((error: AxiosError) => setErrorMessage(error.message))
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
        loginUser,
        createUserProfile,
        fetchUserProfile,
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
        gallery,
        fetchGallery,
        uploadToGallery,
        errorMessage,
        setErrorMessage,
    };

    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
}
