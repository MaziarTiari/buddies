import { IUser } from '../../models/User/User'
import { IUserProfile } from "../../models/User/UserProfile";
import { IActivity } from '../../dev/example_data/fetchedActivityList';

export type ActionState = "on_tour" | "on_edit";

export interface ISessionContextState {
    user: IUser;
    userProfile: IUserProfile;
    actionState: ActionState;
    activity: IActivity;
    setActionState: (action: ActionState) => void;
    setUser: (user: IUser) => void;
    setUserProfile: (profile: IUserProfile) => void;
    saveProfile: (updatedProfile: IUserProfile) => void;
    fetchProfile: (id: number) => void;
    setActivity: (activity: IActivity) => void;
    fetchActivity: (id: string) => void;
    saveActivity: (updatedActivity: IActivity) => void;
}

export const sessionContextInitialState: ISessionContextState = {
    userProfile: {
        id: "", birthDate: 0, city: "", firstname: "", lastname: "", sex: "", userId: "", username: ""
    },
    actionState: "on_tour",
    user: { email: "", id: "", password: "", phone: "", salt: "" },
    activity: { title: "", id: "", visibility: "friends", startDate: 0, ownerUserId: "", location: "", description: "", imageName: "" },
    setUser: () => console.warn("Function setUser() is not implemeted!"),
    setUserProfile: () => console.warn("Function setUserProfile() is not implemeted!"),
    saveProfile: () => console.warn("Function saveProfile() is not implemeted!"),
    fetchProfile: () => console.warn("Function fetchProfile() is not implemented!"),
    setActionState: () => console.warn("Function setActionState() is not implemented!"),
    setActivity: () => console.warn("Function setActivity() is not implemented!"),
    fetchActivity: () => console.warn("Function fetchActivity() ist not implemented!"),
    saveActivity: () => console.warn("Function saveActivity() is not implemented!"),
};
