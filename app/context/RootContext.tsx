import React, { Component } from "react";
import { LanguageContextProvider } from "./LanguageContext/LanguageContext";
import ThemeContextProvider from "./ThemeContext/ThemeContext";
import { MenuProvider } from "react-native-popup-menu";

export default class RootContextProvider extends Component {
    render() {
        return (
            <LanguageContextProvider>
                <ThemeContextProvider>
                    <MenuProvider>{this.props.children}</MenuProvider>
                </ThemeContextProvider>
            </LanguageContextProvider>
        );
    }
}
