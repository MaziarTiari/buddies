import React, { Component } from "react";
import { LanguageContextProvider } from "./LanguageContext/LanguageContext";
import ThemeContextProvider from "./ThemeContext/ThemeContext";
import { MenuProvider } from "react-native-popup-menu";
import { SessionContextProvider } from "./SessionContext/SessionContext";
import { ActivityContextProvider } from "./ActivityContext/ActivityContext";
import { CategoryContextProvider } from "./CategoryContext/CategoryContext";
import ChatContextProvider from "./ChatContext/ChatContext";
import ProfileContextProvider from "./ProfileContext/ProfileContext";

export default class RootContextProvider extends Component {
    render() {
        return (
            <MenuProvider>
                <LanguageContextProvider>
                    <ThemeContextProvider>
                        <SessionContextProvider>
                            <ProfileContextProvider>
                                <ActivityContextProvider>
                                    <CategoryContextProvider>
                                        <ChatContextProvider>
                                            {this.props.children}
                                        </ChatContextProvider>
                                    </CategoryContextProvider>
                                </ActivityContextProvider>
                            </ProfileContextProvider>
                        </SessionContextProvider>
                    </ThemeContextProvider>
                </LanguageContextProvider>
            </MenuProvider>
        );
    }
}
