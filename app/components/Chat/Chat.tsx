import React, { useState, useMemo } from "react";
import { FlatList, View } from "react-native";
import styles from "./Chat.style";
import ChatInput from "../ChatInput/ChatInput";
import Container from "../Container/Container";
import { exampleResponse, IChatMessage } from "../../dev/example_data/ChatReponse";
import ChatItem from "../ChatItem/ChatItem";

const OWN_UUID = "2"; // TODO REMOVE LATER !!!

const Chat = ({ route, navigation }: any) => {
    const { isGroup, displayName } = route.params;
    navigation.setOptions({ title: displayName });

    const messages = useState<IChatMessage[]>(exampleResponse)[0];

    const sortedMessages = useMemo<IChatMessage[]>(
        () => messages.sort((a, b) => (b.date > a.date ? 1 : -1)),
        [messages]
    );

    const handleSend = (message: string) => {
        if (message.trim().length === 0) return;
        // TODO sending the message ...
    };

    return (
        <Container type="screen" layout="root" keyboardAvoiding style={styles.container}>
            <FlatList
                data={sortedMessages}
                renderItem={({ item: message }) => (
                    <ChatItem
                        sender={isGroup ? message.senderDisplayName : undefined}
                        message={message.message}
                        self={message.senderUuid === OWN_UUID}
                        date={message.date}
                    />
                )}
                style={styles.list}
                keyExtractor={(item) => item.uuid}
                inverted
            />
            <ChatInput style={styles.inputField} onSend={handleSend} />
            <View style={{height:600}} />
        </Container>
    );
};

export default Chat;
