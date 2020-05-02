import React from "react";
import { View, Text } from "react-native";
import styles from "./ChatListItem.style";
import translate from "../../utils/function/language/translate";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { IChatPartner, Relation } from "../../dev/example_data/MessageListQueryResponse";

export interface ChatListItemProps {
    chatPartner: IChatPartner;
    onPress?: () => void;
    onLongPress?: () => void;
}

export const ChatListItem = (Props: ChatListItemProps) => {
    const rightComponent = (
        <View style={styles.rightContainer}>
            <Text style={styles.lastMessageText}>
                {getFormattedDateText(Props.chatPartner.lastMessage)}
            </Text>
            <View style={styles.unreadContainer}>
                {Props.chatPartner.unreadMessages > 0 && (
                    <View style={styles.unreadDot}>
                        <Text style={styles.unreadDotText}>
                            {Props.chatPartner.unreadMessages}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <ProfileListItem
            uuid={Props.chatPartner.uuid}
            isOnline={Props.chatPartner.isOnline}
            rightComponent={rightComponent}
            title={Props.chatPartner.displayName}
            subTitle={getRelationText(Props.chatPartner.relation)}
            onPress={Props.onPress}
            onLongPress={Props.onLongPress}
        />
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
        case Relation.GROUP:
            return translate("message_relation_group");
    }
}

function getFormattedDateText(date: Date): string {
    return date.getDate() == new Date().getDate()
        ? date.toLocaleTimeString()
        : date.toLocaleDateString();
}
