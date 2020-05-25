import React, { Component } from "react";
import { LanguageContextProvider } from "./LanguageContext/LanguageContext";
import ThemeContextProvider from "./ThemeContext/ThemeContext";
import { MenuProvider } from "react-native-popup-menu";
import { ProfileContextProvider } from "./ProfileContext/ProfileContext";

export default class RootContextProvider extends Component {
    render() {
        return (
            <LanguageContextProvider>
                <ThemeContextProvider>
                    <ProfileContextProvider>
                        <MenuProvider>{this.props.children}</MenuProvider>
                    </ProfileContextProvider>
                </ThemeContextProvider>
            </LanguageContextProvider>
        );
    }
}
