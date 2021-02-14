import React, { createContext, useState, ReactNode, useRef } from 'react';
import { IUserProfile, INewUserProfile } from '../../models/UserProfile';
import { apiRoutes } from "../../api/channels";
import { AxiosError } from 'axios';
import { IActivity, INewActivity } from '../../models/Activity';
import { IUser, INewUser, IUserCredentials } from '../../models/User';
import {
    ISessionContextModel,
    initSessionContextModel as initState,
    AuthState,
} from './sessionContextModel';
import { IPhotoGallery, IProfileImage } from '../../models/PhotoGallery';
import { IUserAvatar } from '../../models/UserAvatar';
import { useUserClient } from '../../api/userClient';
import { useUserProfileClient } from '../../api/userProfileClient';
import { useActivityClient } from '../../api/activityClient';
import { httpClientBaseConfig } from '../../api/Api.config';
import { TypedAxiosInstance } from '../../api/TypedAxiosInstance';
import useHttpClient from '../../api/httpClient';
import { usePhotoGalleryClient } from '../../api/photoGalleryClient';

const anonymClient = new TypedAxiosInstance<IUser>(
    httpClientBaseConfig, 
    { baseURL: apiRoutes.user() }
);

export const SessionContext = createContext<ISessionContextModel>(initState);

export function SessionContextProvider(props: { children: ReactNode }) {
    
    const token = useRef<string>("");

    const [userCred, setUserCred] = useState<IUserCredentials>({email: "", password: ""});

    const authenticate = (_userCred?: IUserCredentials): Promise<void> =>
        anonymClient
            .post<string, IUserCredentials>(
                apiRoutes.user("authenticate"), 
                _userCred || userCred
            )   
            .then(res => { 
                console.log("authenticate: ", res.data);
                token.current = res.data 
            })
            .catch((error: AxiosError) => {
                console.log("auth error: ");
                throw error;
            })
        ;
    ;

    const userClient = useUserClient(token, authenticate);

    const userProfileClient = useUserProfileClient(token, authenticate);

    const activityClient = useActivityClient(token, authenticate);

    const photoGalleryClient = usePhotoGalleryClient(token, authenticate);

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

    const createUser = (user: INewUser) => {
        setIsLoading(true);
        anonymClient.post<string, INewUser>(undefined, user)
            .then(res => token.current = res.data)
            .then(() => userClient.getUser()
                .then(user => setUser(user))
                .catch((error: AxiosError) => setErrorMessage(error.message))
            )
            .catch((error: AxiosError) => setErrorMessage(error.message))
            .finally(() => {
                setIsLoading(false);
                setAuthState(AuthState.AUTHORIZED_WITHOUT_PROFILE)
            })
        ;
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

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        setUserCred({email, password});
        return (
            authenticate({ email: email, password: password })
                .then(() =>
                    userClient
                        .getUser()
                        .then(user => {
                            setUser(user);
                        })
                        .then(() => {
                            userProfileClient.getUserProfile()
                                .then((userProfile: IUserProfile) => {
                                    console.log("userProfile: ", userProfile);
                                    setUserProfile(userProfile);
                                    setAuthState(AuthState.AUTHORIZED);
                                })
                                .catch(() => {
                                    setAuthState(AuthState.AUTHORIZED_WITHOUT_PROFILE);
                                });
                        })
                        .catch((error: AxiosError) => {
                            console.log("user ERROR");
                            setErrorMessage(error.message);
                        })
                )
                .catch((error: AxiosError) => {
                    console.log("auth error");
                     throw error;
                })
                .finally(() => {
                    setIsLoading(false);
                })
        );
    };

    const createUserProfile = (newUserProfile: INewUserProfile) => {
        setIsLoading(true);
        userProfileClient.createProfile(newUserProfile)
            .then(userProfile => {
                setUserProfile(userProfile);
                return photoGalleryClient.createPhotoGallery({
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
        userProfileClient.updateProfile(updatedUserProfile)
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
        return userProfileClient.getProfileByUserId(userId)
            .then(userProfile => {
                setUserProfile(userProfile);
                return userProfile;
            })
            .catch((axiosError: AxiosError) => {
                console.error(axiosError);
                throw axiosError;
            })
            .finally(() => setIsLoading(false));
    };

    const fetchGallery = (userId: string) => {
        if (gallery.userId === userId) return;
        setGallery(initState.gallery);
        setIsLoading(true);
        photoGalleryClient
            .getUsersGallery()
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
        //if (gallery.userId !== user.id) return;
        setIsLoading(true);
        photoGalleryClient
            .addImage(gallery.id, image)
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

    const updateActivity = (newActivity: IActivity) => {
        setIsLoading(true);
        activityClient.updateActivity(newActivity)
            .then(() => setActivity(newActivity))
            .catch((error: AxiosError) => setErrorMessage(error.message))
            .finally(() => setIsLoading(false));
    };

    const createActivity = (newActivity: INewActivity) => {
        setIsLoading(true);
        activityClient.createActivity(newActivity)
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
        token,
        setUser,
        userProfile,
        setUserProfile,
        activity,
        authenticate,
        setActivity,
        isLoading,
        setIsLoading,
        createUser,
        loginUser: signIn,
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
