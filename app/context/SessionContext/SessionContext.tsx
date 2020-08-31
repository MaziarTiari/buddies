import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { IUserProfile, INewUserProfile } from '../../models/UserProfile';
import { userProfileApi, activityApi } from '../../api/ApiClient';
// import { baseUrl, hubs } from "../../api/channels";
import { AxiosError } from 'axios';
import { NOT_FOUND } from 'http-status-codes';
import { IActivity, INewActivity } from '../../models/Activity';
import { IUser, INewUser } from '../../models/User';
import {
    ISessionContextModel,
    initSessionContextModel as initState,
    AuthState,
    IAvatarBgColor
} from './sessionContextModel';
import { userApi } from '../../api/User/UserApi';
import { IPhotoGallery, IProfileImage } from '../../models/PhotoGallery';
import { galleryApi } from '../../api/GalleryApi';
import { IUserAvatar } from '../../models/UserAvatar';

export const SessionContext = createContext<ISessionContextModel>(initState);

export function SessionContextProvider(props: { children: ReactNode }) {

    const [authState, setAuthState] = useState<AuthState>(AuthState.UNAUTHORIZED);

    const [user, setUser] = useState<IUser>(initState.user);

    const [userProfile, setUserProfile] = useState<IUserProfile>(initState.userProfile);

    const [gallery, setGallery] = useState<IPhotoGallery>(initState.gallery);

    const [activity, setActivity] = useState<IActivity|INewActivity>(initState.activity);

    const [isLoading, setIsLoading] = useState<boolean>(initState.isLoading);

    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        initState.errorMessage
    );

    const [avatarList, setAvatarList] = useState<IUserAvatar[]>(
        initState.avatarList
    );

    const [userIsEditingProfile, setUserIsEditingProfile] = useState<boolean>(
        initState.userIsEditingProfile
    );

    const [userIsEditingActivity, setUserIsEditingActivity] = useState<boolean>(
        initState.userIsEditingActivity
    );

    // Temporary Backups
    const [userProfileBackup, setUserProfileBackup] = useState<IUserProfile>(
        initState.userProfile
    );

    const [activityBackup, setActivityBackup] = useState<IActivity|INewActivity>(
        initState.activity
    );

    const createUser = (createdUser: INewUser) => {
        setIsLoading(true);
        userApi
            .Create<IUser, INewUser>(createdUser)
            .then((user: IUser) => {
                setUser(user);
                setAuthState(AuthState.AUTHORIZED_WITHOUT_PROFILE);
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const logout = () => {
        setUser(initState.user);
        setUserProfile(initState.userProfile);
        setAvatarList(initState.avatarList);
        setActivity(initState.activity),
        setErrorMessage(initState.errorMessage);
        setGallery(initState.gallery);
        setIsLoading(initState.isLoading);
        setUserIsEditingActivity(initState.userIsEditingActivity);
        setUserIsEditingProfile(initState.userIsEditingProfile);
        setAuthState(AuthState.UNAUTHORIZED);
    }

    const loginUser = async (email: string, password: string) => {
        setIsLoading(true);
        let loggedInUser;
        return userApi.VerifyUser({ email: email, password: password })
            .then((user: IUser) => {
                loggedInUser = user;
                userProfileApi
                    .Get<IUserProfile>(user.id)
                    .then((userProfile: IUserProfile) => {
                        setUserProfile(userProfile);
                        setAuthState(AuthState.AUTHORIZED);
                    })
                    .catch((axiosError: AxiosError) => {
                        setAuthState(AuthState.AUTHORIZED_WITHOUT_PROFILE);
                    });
                setUser(loggedInUser);
                return user;
            })
            .catch((axiosError: AxiosError) => {
                throw axiosError;
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const createUserProfile = (createdUserProfile: INewUserProfile) => {
        setIsLoading(true);
        userProfileApi
            .Create<IUserProfile, INewUserProfile>(createdUserProfile)
            .then((userProfile: IUserProfile) => {
                setUserProfile(userProfile);
                return galleryApi.Create<IPhotoGallery>({
                    id: '',
                    userId: userProfile.userId,
                    images: []
                });
            })
            .then((gallery: IPhotoGallery) => {
                setAuthState(AuthState.AUTHORIZED);
                setGallery(gallery);
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const updateUserProfile = (updatedUserProfile: IUserProfile) => {
        setIsLoading(true);
        userProfileApi
            .Update<string, IUserProfile>(
                updatedUserProfile.id,
                updatedUserProfile
            )
            .then(() => {
                setUserProfile(updatedUserProfile);
            })
            .catch((axiosError: AxiosError) => {
                setErrorMessage(axiosError.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const fetchUserProfile = async (userId: string) => {
        if (userProfile.userId === userId) {
            return userProfile;
        }
        setIsLoading(true);
        return userProfileApi
            .Get<IUserProfile>(userId)
            .then((userProfile: IUserProfile) => {
                setUserProfile(userProfile);
                return userProfile;
            })
            .catch((axiosError: AxiosError) => {
                console.error(axiosError);
                throw axiosError as AxiosError;
            })
            .finally(() => setIsLoading(false));
    };

    const fetchGallery = (userId: string) => {
        if (gallery.userId === userId) return;
        setGallery(initState.gallery);
        setIsLoading(true);
        galleryApi
            .Get<IPhotoGallery>(userId)
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
        galleryApi
            .UploadImage(image, gallery.id)
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
        activityApi
            .Update<string, IActivity>(updatedActivity.id, updatedActivity)
            .then(() => setActivity(updatedActivity))
            .catch((error: AxiosError) => setErrorMessage(error.message))
            .finally(() => setIsLoading(false));
    };

    const createActivity = (createdActivity: INewActivity) => {
        setIsLoading(true);
        activityApi
            .Create<IActivity, INewActivity>(createdActivity)
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
        if ((activity as IActivity).id) updateActivity({ ...activity } as IActivity);
        else createActivity({ ...activity } as INewActivity);
        setUserIsEditingActivity(false);
    };

    const cancelEditingActivity = () => {
        if (!userIsEditingActivity) return;
        setActivity({ ...activityBackup });
        setUserIsEditingActivity(false);
    };

    const value: ISessionContextModel = {
        user,
        setUser,
        userProfile,
        setUserProfile,
        activity,
        setActivity,
        isLoading,
        setIsLoading,
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
        avatarList,
        setAvatarList,
        logout
    };

    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
}
