import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootContextProvider from "./app/context/RootContext";
import Navigation from "./app/navigation/Navigation";
import SignUpForm from "./app/components/SignUpForm/SignUpForm";
import CreateProfileForm from "./app/components/CreateProfileForm/CreateProfileForm";
import LoginForm from "./app/components/LoginForm/LoginForm";

export type AuthenticationStatus = 
    "create_profile" | "on_login" | "profile_created" | "login" | null;
    
const App = () => {
    const [status, setStatus] = useState<AuthenticationStatus>(null);

    return (
        <RootContextProvider>
            { status === null && <SignUpForm onSubmit={setStatus} /> }
            {status === "create_profile" && <CreateProfileForm onSubmit={setStatus}/>}
            {status === 'on_login' && <LoginForm onSubmit={setStatus} />}
            {(status === 'profile_created' || status === 'login') && (
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
            )}
        </RootContextProvider>
    );
};

export default App;
