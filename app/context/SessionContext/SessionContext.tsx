import React, { createContext, Component } from "react";
import { ISessionContextState, sessionContextInitialState, ActionState } from "./stateFrame";
import { users } from "../../dev/example_data/users";
import { IUserProfile, IUser } from "../../models/User/User";

export const SessionContext = createContext(sessionContextInitialState);

export class SessionContextProvider extends Component {
    
    fetchProfile = (id: number) => {
        this.setState({ profile: users[id] }); // TODO get by API
    };

    setActionState = (action: ActionState) => {
        this.setState({actionState: action});
    }

    setUser = (userIn: IUser) => {
        this.setState({user: userIn});
    }

    setUserProfile = (userProfileIn: IUserProfile) => {
        this.setState({userProfile: userProfileIn})
    }

    saveProfile = (updatedProfile: IUserProfile) => {
        this.setState({ profile: updatedProfile });
        console.log("Save Profile with id: ", this.state.userProfile.id); // TODO save by API
    };

    state: ISessionContextState = {
        ...sessionContextInitialState,
        setUser: this.setUser,
        setUserProfile: this.setUserProfile,
        fetchProfile: this.fetchProfile,
        saveProfile: this.saveProfile,
        setActionState: this.setActionState
    };

    render() {
        return (
            <SessionContext.Provider value={this.state}>
                {this.props.children}
            </SessionContext.Provider>
        );
    }
}
