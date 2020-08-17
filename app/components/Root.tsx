import React, { useContext } from "react";
import { SessionContext } from "../context/SessionContext/SessionContext";
import SignUpForm from "./SignUpForm/SignUpForm";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../navigation/Navigation";
import LoginForm from "./LoginForm/LoginForm";
import { AuthState } from "../context/SessionContext/stateFrame";
import ProfileEditForm from "./ProfileEditForm/ProfileEditForm";

const Root = (): JSX.Element => {

    const { authState } = useContext(SessionContext);

    switch (authState) {
        case AuthState.UNREGISTERED:
            return <SignUpForm />;
        case AuthState.UNAUTHORIZED:
            return <LoginForm />;
        case AuthState.AUTHORIZED_WITHOUT_PROFILE:
            return <ProfileEditForm />;
        case AuthState.AUTHORIZED:
            return (
                <NavigationContainer>
                    <Navigation />
                </NavigationContainer>
            );
    }

};

export default Root;