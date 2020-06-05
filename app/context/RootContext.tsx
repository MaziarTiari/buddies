import React, { Component } from "react";
import { LanguageContextProvider } from "./LanguageContext/LanguageContext";
import ThemeContextProvider from "./ThemeContext/ThemeContext";
import { MenuProvider } from "react-native-popup-menu";
import { SessionContextProvider } from "./SessionContext/SessionContext";

export default class RootContextProvider extends Component {
    render() {
        return (
            <MenuProvider>
                <LanguageContextProvider>
                    <ThemeContextProvider>
                        <SessionContextProvider>
                            {this.props.children}
                        </SessionContextProvider>
                    </ThemeContextProvider>
                </LanguageContextProvider>
            </MenuProvider>
        );
    }
}
