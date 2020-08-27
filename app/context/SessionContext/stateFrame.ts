import { IUser, INewUser } from '../../models/User'
import { IUserProfile, INewUserProfile } from "../../models/UserProfile";
import { IActivity } from '../../models/Activity';
import { IPhotoGallery, IProfileImage } from '../../models/PhotoGallery';

export enum AuthState { UNREGISTERED, UNAUTHORIZED, AUTHORIZED, AUTHORIZED_WITHOUT_PROFILE };

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
    createUser: (createdUser: INewUser) => void;
    loginUser: (email: string, password: string) => void;
    createUserProfile: (createdUserProfile: INewUserProfile) => void;
    fetchUserProfile: (userId: string) => void;
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
}

export const initialState: ISessionContextState = {
    authState: AuthState.UNREGISTERED,
    userProfile: {
        id: "",
        birthDate: 0,
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
        startDate: 0,
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
    errorMessage: undefined,
    setAuthState: () => console.warn("setAuthState() not implemented!"),
    setUser: () => console.warn("setUser() not implemented!"),
    setUserProfile: () => console.warn("setUserProfile() not implemented!"),
    setActivity: () => console.warn("setActivity() not implemented!"),
    isLoading: false,
    createUser: () => console.warn("createUser() not implemented!"),
    loginUser: () => console.warn("loginUser() not implemented!"),
    createUserProfile: () => console.warn("createUserProfile() not implemented!"),
    userIsEditingProfile: false,
    fetchUserProfile: () => console.warn("fetchUserProfile() not implemented!"),
    startEditingProfile: () => console.warn("startEditingProfile() not implemented!"),
    saveEditingProfile: () => console.warn("saveEditingProfile() not implemented!"),
    cancelEditingProfile: () => console.warn("cancelEditingProfile() not implemented!"),
    userIsEditingActivity: false,
    startEditingActivity: () => console.warn("startEditingActivity() not implemented!"),
    saveEditingActivity: () => console.warn("saveEditingActivity() not implemented!"),
    cancelEditingActivity: () => console.warn("cancelEditingActivity() not implemented!"),
    fetchGallery: () => console.warn("fetchGallery() not implemented!"),
    uploadToGallery: () => console.warn("uploadToGallery() not implemented!"),
    setErrorMessage: () => console.warn("setErrorMessage() not implemented!")
};