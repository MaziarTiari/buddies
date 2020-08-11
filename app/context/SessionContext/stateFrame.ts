import { IUser } from '../../models/User'
import { IUserProfile } from "../../models/UserProfile";
import { IActivity } from '../../dev/example_data/fetchedActivityList';

export interface ISessionContextState {
    user: IUser;
    userProfile: IUserProfile;
    activity: IActivity;
    setUser: (user: IUser) => void;
    setUserProfile: (profile: IUserProfile) => void;
    setActivity: (activity: IActivity) => void;
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
        visibility: "friends", 
        startDate: 0, 
        ownerUserId: "", 
        location: "", 
        description: "", 
        imageName: "" 
    },
    setUser: () => console.warn("setUser() not implemeted!"),
    setUserProfile: () => console.warn("setUserProfile() not implemeted!"),
    setActivity: () => console.warn("setActivity() not implemented!"),
    updateUserProfile: () => console.warn("updateUserProfile() not implemented!"),
};
