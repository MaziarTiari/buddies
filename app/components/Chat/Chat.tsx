import React from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
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
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <FlatList data={null} renderItem={null} style={styles.list} />
                <ChatInput onSend={handleSend} />
            </KeyboardAvoidingView>
        </ScreenContentContainer>
    );
};

export default Chat;
