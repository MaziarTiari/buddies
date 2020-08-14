import React from "react";
import RootContextProvider from "./app/context/RootContext";
import Root from "./app/components/Root";

const App = () => (
    <RootContextProvider>
        <Root />
    </RootContextProvider>
);

export default App;
