import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootContextProvider from "./app/context/RootContext";
import Navigation from "./app/navigation/Navigation";
import SignUpForm from "./app/components/SignUpForm/SignUpForm";

const App = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    return (
        <RootContextProvider>
            {!isAuthorized &&
            <SignUpForm/>
            }
            {isAuthorized &&
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
            }
        </RootContextProvider>
    );
};

export default App;
