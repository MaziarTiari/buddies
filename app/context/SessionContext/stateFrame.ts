import { IUser } from '../../models/User/User'
import { IUserProfile } from "../../models/User/UserProfile";
import { IActivity } from '../../dev/example_data/fetchedActivityList';

export interface ISessionContextState {
    user: IUser;
    userProfile: IUserProfile;
    activity: IActivity;
    setUser: (user: IUser) => void;
    setUserProfile: (profile: IUserProfile) => void;
    setActivity: (activity: IActivity) => void;
}

export const sessionContextInitialState: ISessionContextState = {
    userProfile: { id: "", birthDate: 0, city: "", firstname: "", lastname: "", sex: "", userId: "", username: "" },
    user: { email: "", id: "", password: "", phone: "", salt: "" },
    activity: { title: "", id: "", visibility: "friends", startDate: 0, ownerUserId: "", location: "", description: "", imageName: "" },
    setUser: () => console.warn("Function setUser() is not implemeted!"),
    setUserProfile: () => console.warn("Function setUserProfile() is not implemeted!"),
    setActivity: () => console.warn("Function setActivity() is not implemented!"),
};
