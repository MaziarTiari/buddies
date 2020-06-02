import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootContextProvider from "./app/context/RootContext";
import Navigation from "./app/navigation/Navigation";
import SignUpForm from "./app/components/SignUpForm/SignUpForm";
import CreateProfileForm from "./app/components/CreateProfileForm/CreateProfileForm";
import LoginForm from "./app/components/LoginForm/LoginForm";

type StatusType = "signedUp"|"userExists"|"profileCreated"|"loggedIn"|null;
const App = () => {
    const [status, setStatus] = useState<StatusType>(null);

    return (
        <RootContextProvider>
            {!status && 
            <SignUpForm
                onSignedUp={status => status && setStatus("signedUp")} 
                onLogin={() => setStatus("userExists")}/>}
            {status === "signedUp" && 
            <CreateProfileForm onSubmit={() => setStatus("profileCreated")}/>}
            {status === 'userExists' && 
            <LoginForm 
                onLoggedIn={() => setStatus("loggedIn")} 
                onRegister={() => setStatus(null)} 
                onCreateUser={() => setStatus("signedUp")}/>}
            {(status === 'profileCreated' || status === 'loggedIn') && (
                <NavigationContainer>
                    <Navigation />
                </NavigationContainer>
            )}
        </RootContextProvider>
    );
};

export default App;
