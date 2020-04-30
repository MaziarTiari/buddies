import React from "react";
import { FlatList, View, Platform } from "react-native";
import styles from "./Chat.style";
import ChatInput from "../ChatInput/ChatInput";
import Container from "../Container/Container";

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
        <Container layout="screen_centered" keyboardAvoiding style={styles.container}>
            <FlatList data={null} renderItem={null} style={styles.list} />
            <ChatInput style={styles.inputField} onSend={handleSend} />
        </Container>
    );
};

export default Chat;
