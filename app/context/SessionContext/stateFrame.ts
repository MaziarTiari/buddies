import { IUser } from '../../models/User'
import { IUserProfile } from "../../models/UserProfile";
import { Activity } from '../../models/Activity';

export interface ISessionContextState {
    user: IUser;
    userProfile: IUserProfile;
    activity: Activity;
    setUser: (user: IUser) => void;
    setUserProfile: (profile: IUserProfile) => void;
    setActivity: (activity: Activity) => void;
    updateUserProfile: (newUserProfile: IUserProfile) => void;
}

export const initialState: ISessionContextState = {
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
    setUser: () => console.warn("setUser() not implemeted!"),
    setUserProfile: () => console.warn("setUserProfile() not implemeted!"),
    setActivity: () => console.warn("setActivity() not implemented!"),
    updateUserProfile: () => console.warn("updateUserProfile() not implemented!"),
};