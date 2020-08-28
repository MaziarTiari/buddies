import { IUser, INewUser } from '../../models/User'
import { IUserProfile, INewUserProfile } from "../../models/UserProfile";
import { IActivity } from '../../models/Activity';
import { IPhotoGallery, IProfileImage } from '../../models/PhotoGallery';
import { IUserAvatar } from '../../models/UserAvatar';
import { loadOptions } from '@babel/core';
import moment from 'moment';

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
    createUserError?: string;
    loginUser: (email: string, password: string) => void;
    loginUserError?: string;
    createUserProfile: (createdUserProfile: INewUserProfile) => void;
    createUserProfileError?: string;
    fetchUserProfile: (userId: string) => Promise<void>;
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
    avatarList: Array<IUserAvatar>
    setAvatarList: (avatarList: Array<IUserAvatar>) => void;
}

export const initialState: ISessionContextState = {
    authState: AuthState.UNREGISTERED,
    userProfile: {
        id: "",
        birthDate: moment().subtract(14, "years").unix(),
        city: "",
        firstname: "",
        lastname: "",
        sex: "",
        userId: "",
        username: ""
    },
    user: {
        email: "",
        id: "",
        password: "",
        phone: "",
        salt: ""
    },
    activity: {
        title: "",
        id: "",
        visibility: 0,
        userId: "",
        location: "",
        description: "",
        memberUserIds: [],
        applicantUserIds: []
    },
    gallery: {
        id: "",
        userId: "",
        images: [],
    },
    avatarList: [],
    setAuthState: () => console.warn("setAuthState() not implemented!"),
    setUser: () => console.warn("setUser() not implemented!"),
    setUserProfile: () => console.warn("setUserProfile() not implemented!"),
    setActivity: () => console.warn("setActivity() not implemented!"),
    isLoading: false,
    createUser: () => console.warn("createUser() not implemented!"),
    createUserError: undefined,
    loginUser: () => console.warn("loginUser() not implemented!"),
    loginUserError: undefined,
    createUserProfile: () => console.warn("createUserProfile() not implemented!"),
    createUserProfileError: undefined,
    userIsEditingProfile: false,
    fetchUserProfile: async () => console.warn("fetchUserProfile() not implemented!"),
    startEditingProfile: () => console.warn("startEditingProfile() not implemented!"),
    saveEditingProfile: () => console.warn("saveEditingProfile() not implemented!"),
    cancelEditingProfile: () => console.warn("cancelEditingProfile() not implemented!"),
    userIsEditingActivity: false,
    startEditingActivity: () => console.warn("startEditingActivity() not implemented!"),
    saveEditingActivity: () => console.warn("saveEditingActivity() not implemented!"),
    cancelEditingActivity: () => console.warn("cancelEditingActivity() not implemented!"),
    fetchGallery: () => console.warn("fetchGallery() not implemented!"),
    uploadToGallery: () => console.warn("uploadToGallery() not implemented!"),
    setAvatarList:  () => console.warn("setAvatarList() not implemented!"),
    setIsLoading: () => console.warn("setIsLoading() not implemented!"),
};