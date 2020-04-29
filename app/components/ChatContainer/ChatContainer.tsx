import React from "react";
import { Text } from "react-native";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";
import { styles } from "../ScreenContentContainer/ScreenContentContainer.style";

export interface ChatContainerParams {
    title: string;
}

const ChatContainer = ({ route, navigation }: any) => {
    const Params: ChatContainerParams = route.params;

    navigation.setOptions({ title: Params.title });

    return (
        <ScreenContentContainer>
            <Text style={styles.text}>ChatContainer</Text>
        </ScreenContentContainer>
    );
};

export default ChatContainer;
