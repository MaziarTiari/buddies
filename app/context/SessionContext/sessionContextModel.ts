import { IUser, INewUser } from '../../models/User'
import { IUserProfile, INewUserProfile } from "../../models/UserProfile";
import { IActivity, INewActivity } from '../../models/Activity';
import { IPhotoGallery, IProfileImage } from '../../models/PhotoGallery';
import { IUserAvatar } from '../../models/UserAvatar';
import moment from 'moment';
import { MutableRefObject } from 'react';

export enum AuthState { UNREGISTERED, UNAUTHORIZED, AUTHORIZED, AUTHORIZED_WITHOUT_PROFILE };

export interface IAvatarBgColor { userId: string; color: string };
export interface ISessionContextModel {
    authState: AuthState;
    setAuthState: (authState: AuthState) => void;
    user: IUser;
    token: MutableRefObject<string>;
    userProfile: IUserProfile;
    activity: IActivity | INewActivity;
    setUser: (user: IUser) => void;
    setUserProfile: (profile: IUserProfile) => void;
    setActivity: (activity: IActivity) => void;
    authenticate: () => Promise<void>;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
    createUser: (createdUser: INewUser) => void;
    loginUser: (email: string, password: string) => Promise<void>;
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
    logout: () => void;
}

export const defaultUser = {
    email: "",
    id: "",
    password: "",
    phone: "",
    salt: ""
};

export const defaultUserProfile = {
    id: "",
    birthDate: moment().subtract(18, "years").unix(),
    city: "",
    firstname: "",
    lastname: "",
    sex: "",
    userId: "",
    username: ""
};

export const defaultActivity: IActivity = {
    id: "",
    title: "",
    visibility: 0,
    userId: "",
    description: "",
    memberUserIds: [],
    applicantUserIds: []
};

export const initSessionContextModel: ISessionContextModel = {
    authState: AuthState.UNREGISTERED,
    userProfile: defaultUserProfile,
    user: defaultUser,
    token: {current: ""},
    activity: defaultActivity,
    gallery: {
        id: "",
        userId: "",
        images: [],
    },
    authenticate: async () => console.warn("authenticate() not implemented!"),
    errorMessage: undefined,
    avatarList: [],
    setAuthState: () => console.warn("setAuthState() not implemented!"),
    setUser: () => console.warn("setUser() not implemented!"),
    setUserProfile: () => console.warn("setUserProfile() not implemented!"),
    setActivity: () => console.warn("setActivity() not implemented!"),
    isLoading: false,
    createUser: () => console.warn("createUser() not implemented!"),
    loginUser: async () => console.warn("loginUser not implemented!"),
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
    logout: () => console.warn("logout() not implemented!"),
};