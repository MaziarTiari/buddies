import { users } from "../../dev/example_data/users";
import { IUserProfile } from "../../models/User";

export interface IProfileContextState {
    profile: IUserProfile;
    saveProfile: (updatedProfile: IUserProfile) => void;
    fetchProfile: (id: number) => void;
}

export const profileContextInitialState: IProfileContextState = {
    profile: users[3],
    saveProfile: () => console.warn("Function saveProfile() is not implemeted!"),
    fetchProfile: () => console.warn("Function fetchProfile() is not implemented!"),
};
