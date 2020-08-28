import { IUser, INewUser } from '../../models/User'
import { IUserProfile, INewUserProfile } from "../../models/UserProfile";
import { IActivity } from '../../models/Activity';
import { IPhotoGallery, IProfileImage } from '../../models/PhotoGallery';
import { IUserAvatar } from '../../models/UserAvatar';
import { loadOptions } from '@babel/core';
import moment from 'moment';
import { AxiosError } from 'axios';

export enum AuthState { UNREGISTERED, UNAUTHORIZED, AUTHORIZED, AUTHORIZED_WITHOUT_PROFILE };

export interface IAvatarBgColor { userId: string; color: string };
export interface ISessionContextState {
    authState: AuthState;
    setAuthState: (authState: AuthState) => void;
    user: IUser;
    userProfile: IUserProfile;
    activity: IActivity;
    setUser: (user: IUser) => void;
    setUserProfile: (profile: IUserProfile) => void;
    setActivity: (activity: IActivity) => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
    createUser: (createdUser: INewUser) => void;
    loginUser: (email: string, password: string) => void;
    createUserProfile: (createdUserProfile: INewUserProfile) => void;
    fetchUserProfile: (userId: string) => Promise<IUserProfile>;
    userIsEditingProfile: boolean;
    startEditingProfile: () => void;
    saveEditingProfile: () => void;
    cancelEditingProfile: () => void;
    userIsEditingActivity: boolean;
    startEditingActivity: () => void;
    saveEditingActivity: () => void;
    cancelEditingActivity: () => void;
    gallery: IPhotoGallery,
    fetchGallery: (userId: string) => void;
    uploadToGallery: (image: IProfileImage) => void;
    errorMessage: string | undefined;
    setErrorMessage: (errorMessage: string | undefined) => void;
    avatarList: Array<IUserAvatar>
    setAvatarList: (avatarList: Array<IUserAvatar>) => void;
}

export const defaultUserProfile = {
    id: "",
    birthDate: moment().subtract(18, "years").unix(),
    city: "",
    firstname: "",
    lastname: "",
    sex: "",
    userId: "",
    username: ""
}

export const defaultActivity = {
    title: "",
    id: "",
    visibility: 0,
    userId: "",
    description: "",
    memberUserIds: [],
    applicantUserIds: []
}

export const initialState: ISessionContextState = {
    authState: AuthState.UNREGISTERED,
    userProfile: defaultUserProfile,
    user: {
        email: "",
        id: "",
        password: "",
        phone: "",
        salt: ""
    },
    activity: defaultActivity,
    gallery: {
        id: "",
        userId: "",
        images: [],
    },
    errorMessage: undefined,
    avatarList: [],
    setAuthState: () => console.warn("setAuthState() not implemented!"),
    setUser: () => console.warn("setUser() not implemented!"),
    setUserProfile: () => console.warn("setUserProfile() not implemented!"),
    setActivity: () => console.warn("setActivity() not implemented!"),
    isLoading: false,
    createUser: () => console.warn("createUser() not implemented!"),
    loginUser: () => console.warn("loginUser() not implemented!"),
    createUserProfile: () => console.warn("createUserProfile() not implemented!"),
    userIsEditingProfile: false,
    fetchUserProfile: async () => defaultUserProfile,
    startEditingProfile: () => console.warn("startEditingProfile() not implemented!"),
    saveEditingProfile: () => console.warn("saveEditingProfile() not implemented!"),
    cancelEditingProfile: () => console.warn("cancelEditingProfile() not implemented!"),
    userIsEditingActivity: false,
    startEditingActivity: () => console.warn("startEditingActivity() not implemented!"),
    saveEditingActivity: () => console.warn("saveEditingActivity() not implemented!"),
    cancelEditingActivity: () => console.warn("cancelEditingActivity() not implemented!"),
    fetchGallery: () => console.warn("fetchGallery() not implemented!"),
    uploadToGallery: () => console.warn("uploadToGallery() not implemented!"),
    setErrorMessage: () => console.warn("setErrorMessage() not implemented!"),
    setAvatarList:  () => console.warn("setAvatarList() not implemented!"),
    setIsLoading: () => console.warn("setIsLoading() not implemented!"),
};