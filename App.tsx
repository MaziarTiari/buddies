import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootContextProvider from "./app/context/RootContext";
import Navigation from "./app/navigation/Navigation";
import LoginForm from "./app/components/LoginForm/LoginForm";

const App = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    return (
        <RootContextProvider>
            {!isAuthorized &&
            <LoginForm/>
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
