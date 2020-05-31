import React, { createContext, Component } from "react";
import { IProfileContextState, profileContextInitialState } from "./stateFrame";
import { users } from "../../dev/example_data/users";
import { IUserProfile, IUser } from "../../models/User";

export const ProfileContext = createContext(profileContextInitialState);

export class ProfileContextProvider extends Component {
    fetchProfile = (id: number) => {
        this.setState({ profile: users[id] }); // TODO get by API
    };

    setUser = (userIn: IUser) => this.setState({user: userIn});

    setUserProfile = (userProfileIn: IUserProfile) => 
        this.setState({userProfile: userProfileIn})

    saveProfile = (updatedProfile: IUserProfile) => {
        this.setState({ profile: updatedProfile });
        console.log("Save Profile with id: ", this.state.userProfile.id); // TODO save by API
    };

    state: IProfileContextState = {
        ...profileContextInitialState,
        setUser: this.setUser,
        setUserProfile: this.setUserProfile,
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
