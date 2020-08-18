import { IUser, INewUser } from '../../models/User'
import { IUserProfile, INewUserProfile } from "../../models/UserProfile";
import { IActivity } from '../../models/Activity';

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
    updateActivity: (updatedActivity: IActivity) => void;
    isLoading: boolean;
    createUser: (createdUser: INewUser) => void;
    createUserError?: string;
    loginUser: (email: string, password: string) => void;
    loginUserError?: string;
    createUserProfile: (createdUserProfile: INewUserProfile) => void;
    createUserProfileError?: string;
    userIsEditingProfile: boolean;
    startEditingProfile: () => void;
    saveEditingProfile: () => void;
    cancelEditingProfile: () => void;
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
    setAuthState: () => console.warn("setAuthState() not implemented!"),
    setUser: () => console.warn("setUser() not implemented!"),
    setUserProfile: () => console.warn("setUserProfile() not implemented!"),
    setActivity: () => console.warn("setActivity() not implemented!"),
    updateActivity: () => console.warn("updateActivity() not implemented!"),
    isLoading: false,
    createUser: () => console.warn("createUser() not implemented!"),
    createUserError: undefined,
    loginUser: () => console.warn("loginUser() not implemented!"),
    loginUserError: undefined,
    createUserProfile: () => console.warn("createUserProfile() not implemented!"),
    createUserProfileError: undefined,
    userIsEditingProfile: false,
    startEditingProfile: () => console.warn("startEditingProfile() not implemented!"),
    saveEditingProfile: () => console.warn("saveEditingProfile() not implemented!"),
    cancelEditingProfile: () => console.warn("cancelEditingProfile() not implemented!"),
};