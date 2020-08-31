import React, { useContext } from "react";
import { SessionContext } from "./context/SessionContext/SessionContext";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";
import LoginForm from "./components/LoginForm/LoginForm";
import { AuthState } from "./context/SessionContext/sessionContextModel";
import ProfileEditForm from "./components/ProfileEditForm/ProfileEditForm";
import LoadingModal from "./components/LoadingModal/LoadingModal";
import { Switch, Case, If } from 'react-if';
import ErrorModal from "./components/ErrorModal/ErrorModal";

const App = (): JSX.Element => {

    const { authState, isLoading, errorMessage } = useContext(SessionContext);

    return (
        <React.Fragment>
            <Switch>
                <Case condition={authState === AuthState.UNREGISTERED}>
                    <SignUpForm />
                </Case>
                <Case condition={authState === AuthState.UNAUTHORIZED}>
                    <LoginForm />
                </Case>
                <Case condition={authState === AuthState.AUTHORIZED_WITHOUT_PROFILE}>
                    <ProfileEditForm />
                </Case>
                <Case condition={authState === AuthState.AUTHORIZED}>
                    <NavigationContainer>
                        <Navigation />
                    </NavigationContainer>
                </Case>
            </Switch>
            <Switch>
                <Case condition={isLoading}>
                    <LoadingModal />
                </Case>
                <Case condition={!!errorMessage}>
                    <ErrorModal />
                </Case>
            </Switch>
        </React.Fragment>
    );

}

export default App;