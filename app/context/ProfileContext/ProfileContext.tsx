import React, { createContext, Component } from "react";
import { IProfileContextState, profileContextInitialState } from "./stateFrame";
import { users } from "../../dev/example_data/users";
import { IUserProfile } from "../../models/User";

export const ProfileContext = createContext(profileContextInitialState);

export class ProfileContextProvider extends Component {
    fetchProfile = (id: number) => {
        this.setState({ profile: users[id] }); // TODO get by API
    };

    saveProfile = (updatedProfile: IUserProfile) => {
        this.setState({ profile: updatedProfile });
        console.log("Save Profile with id: ", this.state.profile.id); // TODO save by API
    };

    state: IProfileContextState = {
        ...profileContextInitialState,
        fetchProfile: this.fetchProfile,
        saveProfile: this.saveProfile,
    };

    render() {
        return (
            <ProfileContext.Provider value={this.state}>
                {this.props.children}
            </ProfileContext.Provider>
        );
    }
}
