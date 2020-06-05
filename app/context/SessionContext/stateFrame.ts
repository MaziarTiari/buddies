import { IUser } from '../../models/User/User'
import { IUserProfile } from "../../models/User/UserProfile";

export interface ISessionContextState {
    user: IUser;
    userProfile: IUserProfile;
    setUser: (user: IUser) => void;
    setUserProfile: (profile: IUserProfile) => void;
    // saveProfile: (updatedProfile: IUserProfile) => void;
    // fetchProfile: (id: number) => void;
}

export const sessionContextInitialState: ISessionContextState = {
    userProfile: {
        id:"",birthDate:0,city:"",firstname:"",lastname:"",sex:"",userId:"",username:""
    },
    user: {email:"", id:"", password:"", phone:"", salt:""},
    setUser: () => console.warn("Function setUser() is not implemeted!"),
    setUserProfile: () => console.warn("Function setUserProfile() is not implemeted!"),
    // saveProfile: () => console.warn("Function saveProfile() is not implemeted!"),
    // fetchProfile: () => console.warn("Function fetchProfile() is not implemented!"),
};
