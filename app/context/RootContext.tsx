import React, { Component } from "react";
import { LanguageContextProvider } from "./LanguageContext/LanguageContext";
import ThemeContextProvider from "./ThemeContext/ThemeContext";
import { MenuProvider } from "react-native-popup-menu";
import { SessionContextProvider } from "./SessionContext/SessionContext";
import { ActivityContextProvider } from "./ActivityContext/ActivityContext";
import { CategoryContextProvider } from "./CategoryContext/CategoryContext";

export default class RootContextProvider extends Component {
    render() {
        return (
            <MenuProvider>
                <LanguageContextProvider>
                    <ThemeContextProvider>
                        <SessionContextProvider>
                            <ActivityContextProvider>
                                <CategoryContextProvider>
                                    {this.props.children}
                                </CategoryContextProvider>
                            </ActivityContextProvider>
                        </SessionContextProvider>
                    </ThemeContextProvider>
                </LanguageContextProvider>
            </MenuProvider>
        );
    }
}
