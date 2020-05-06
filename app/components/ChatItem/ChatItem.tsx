import React from "react";
import { View, Text } from "react-native";
import useStyle from "./ChatItem.style";

export interface ChatItemProps {
    message: string;
    sender?: string;
    date: Date;
    self: boolean;
}

const ChatItem = (Props: ChatItemProps) => {
    const styles = useStyle();
    return (
        <View
            style={[
                styles.messageContainer,
                Props.self ? styles.messageContainerSelf : styles.messageContainerOther,
            ]}
        >
            {Props.sender && <Text style={styles.nameText}>{Props.sender}</Text>}
            <Text style={styles.messageText}>{Props.message}</Text>
            <Text style={styles.dateText}>{Props.date.toLocaleTimeString()}</Text>
        </View>
    );
};

export default ChatItem;
