import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const ChatList = () => {
    return (
        <ScreenContentContainer>
            <Text style={{color: Color.secondaryText}}>Chatlist Screen</Text>
        </ScreenContentContainer>
    );
};

export default ChatList;
