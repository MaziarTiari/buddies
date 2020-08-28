import React from "react";
import RootContextProvider from "./context/RootContext";
import App from "./App";

const Root = () => (
    <RootContextProvider>
        <App />
    </RootContextProvider>
);

export default Root;
