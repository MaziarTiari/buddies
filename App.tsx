import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootContextProvider from "./app/context/RootContext";
import Navigation from "./app/navigation/Navigation";

const App = () => {
    
    return (
        <RootContextProvider>
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
        </RootContextProvider>
    );
};

export default App;
