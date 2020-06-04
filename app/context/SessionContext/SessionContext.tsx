import React, { createContext, Component } from "react";
import { ISessionContextState, sessionContextInitialState, ActionState } from "./stateFrame";
import { users } from "../../dev/example_data/users";
import { IUser } from "../../models/User/User";
import { IUserProfile } from "../../models/User/UserProfile";
import { activities, IActivity } from "../../dev/example_data/fetchedActivityList";

export const SessionContext = createContext(sessionContextInitialState);

export class SessionContextProvider extends Component {

    fetchProfile = (id: number) => {
        this.setState({ profile: users[id] }); // TODO get by API
    };

    fetchActivity = (id: string) => {
        this.setState({ activity: activities.find(a => a.id === id) }); // TODO get by API
    };

    setActionState = (action: ActionState) => {
        this.setState({ actionState: action });
    }

    setUser = (userIn: IUser) => {
        this.setState({ user: userIn });
    }

    setActivity = (activityIn: IActivity) => {
        this.setState({ activity: activityIn });
    };

    setUserProfile = (userProfileIn: IUserProfile) => {
        this.setState({ userProfile: userProfileIn });
    };

    saveProfile = (updatedProfile: IUserProfile) => {
        this.setState({ profile: updatedProfile });
        console.log("Save Profile with id: ", this.state.userProfile.id); // TODO save by API
    };

    saveActivity = (updatedActivity: IActivity) => {
        this.setState({ activity: updatedActivity });
        console.log("Save Activity with id: ", this.state.activity.id);
    };

    state: ISessionContextState = {
        ...sessionContextInitialState,
        setUser: this.setUser,
        setUserProfile: this.setUserProfile,
        fetchProfile: this.fetchProfile,
        saveProfile: this.saveProfile,
        setActionState: this.setActionState,
        fetchActivity: this.fetchActivity,
        saveActivity: this.saveActivity,
        setActivity: this.setActivity,
    };

    render() {
        return (
            <SessionContext.Provider value={this.state}>
                {this.props.children}
            </SessionContext.Provider>
        );
    }
}
