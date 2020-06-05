import React, { createContext, useState, ReactNode } from "react";
import { sessionContextInitialState } from "./stateFrame";

export const SessionContext = createContext(sessionContextInitialState);

export const SessionContextProvider = (props: {children: ReactNode}) => {
    const [user, setUser] = useState(sessionContextInitialState.user);
    const [userProfile, setUserProfile] = 
        useState(sessionContextInitialState.userProfile);
    const value = { user, setUser, userProfile, setUserProfile };

    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
}
