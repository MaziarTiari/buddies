import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./MessageListItem.style";
import translate from "../../utils/language/translate";
import { TouchableRipple } from "react-native-paper";

export enum Relation {
    STRANGER,
    FRIEND,
    BLOCKED,
}

export interface MessageListItemProps {
    uuid: string;
    displayName: string;
    isOnline: boolean;
    relation: Relation;
    unreadMessages: number;
    lastMessage: Date;
}

export const MessageListItem = (Props: MessageListItemProps) => {
    return (
        <TouchableRipple
            rippleColor="rgba(0, 0, 0, 0.3)"
            onPress={() => {}} // todo
            onLongPress={() => {}} // todo
        >
            <View style={styles.container}>
                <Image
                    style={styles.profileImage}
                    source={require("../../../assets/img/defaultProfileImage.png")}
                />
                {Props.isOnline && <View style={styles.onlineDot}></View>}
                <View style={styles.textContainer}>
                    <Text style={styles.displayText}>{Props.displayName}</Text>
                    <Text style={styles.statusText}>
                        {getRelationText(Props.relation)}
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.lastMessageText}>
                        {getFormattedDateText(Props.lastMessage)}
                    </Text>
                    <View style={styles.unreadContainer}>
                        {Props.unreadMessages > 0 && (
                            <View style={styles.unreadDot}>
                                <Text style={styles.unreadDotText}>
                                    {Props.unreadMessages}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableRipple>
    );
};

function getRelationText(relation: Relation): string {
    switch (relation) {
        case Relation.FRIEND:
            return translate("message_relation_friend");
        case Relation.STRANGER:
            return translate("message_relation_stranger");
        case Relation.BLOCKED:
            return translate("message_relation_blocked");
    }
}

function getFormattedDateText(date: Date): string {
    return date.getDate() == new Date().getDate()
        ? date.toLocaleTimeString()
        : date.toLocaleDateString();
}
