import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import AppScreen from "../AppScreen/AppScreen";

const ChatListScreen = () => {
    return (
        <AppScreen>
            <Text style={{color: Color.secondaryText}}>Chatlist Screen</Text>
        </AppScreen>
    );
};

export default ChatListScreen;
