import React from "react";
import { Else, If, Then } from "react-if";
import { View, Text, ActivityIndicator } from "react-native";
import { useLocalDate } from "../../hooks/useLocalDate";
import useChatItemStyle from "./ChatItem.style";
import moment from 'moment';
export interface ChatItemProps {
    message: string;
    author?: string;
    date?: number;
    self: boolean;
}

export default function ChatItem(props: ChatItemProps) {
    const styles = useChatItemStyle(props.self);
    const { getLocalTimeString } = useLocalDate();
    return (
        <View style={[styles.messageContainer, props.self ? styles.self : styles.otherMember]}>
            {props.author && <Text style={styles.nameText}>{props.author}</Text>}
            <Text style={styles.messageText}>{props.message}</Text>
            <If condition={props.date !== undefined}>
                <Then>
                    <Text style={styles.dateText}>
                        {getLocalTimeString(props.date!)}
                    </Text>
                </Then>
                <Else>
                    <View style={styles.dateText}>
                        <ActivityIndicator size="small" color="white" />
                    </View>
                </Else>
            </If>
        </View>
    );
};
