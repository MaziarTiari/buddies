import React from "react";
import { Text } from "react-native";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";
import { styles } from "../ScreenContentContainer/ScreenContentContainer.style";

export interface ChatParams {
    title: string;
}

const Chat = ({ route, navigation }: any) => {
    const Params: ChatParams = route.params;

    navigation.setOptions({ title: Params.title });

    return (
        <ScreenContentContainer>
            <Text style={styles.text}>ChatContainer</Text>
        </ScreenContentContainer>
    );
};

export default Chat;
