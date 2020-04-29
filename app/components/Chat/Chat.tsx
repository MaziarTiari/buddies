import React from "react";
import { View, Text } from "react-native";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";
import styles from "./Chat.style";
import ChatInput from "../ChatInput/ChatInput";

export interface ChatParams {
    title: string;
}

const Chat = ({ route, navigation }: any) => {
    const Params: ChatParams = route.params;
    navigation.setOptions({ title: Params.title });

    const handleSend = (message: string) => {
        // TODO
        console.log("Sending message: ", message);
    };

    return (
        <ScreenContentContainer style={styles.container}>
                {/* TODO FlatList */}
            <View style={{flex:1, justifyContent:"flex-end", height:"10%"}}>
                <ChatInput onSend={handleSend} />
            </View>
        </ScreenContentContainer>
    );
};

export default Chat;
