import React from "react";
import { View, Text } from "react-native";
import styles from "./MessageListItem.style";
import translate from "../../utils/language/translate";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";

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
    
    const rightComponent = (
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
    );
    
    return (
        <ProfileListItem 
            uuid={Props.uuid} isOnline={Props.isOnline} rightComponent={rightComponent}
            title={Props.displayName} subTitle={getRelationText(Props.relation)}
            onPress={() => {}}
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
    }
}

function getFormattedDateText(date: Date): string {
    return date.getDate() == new Date().getDate()
        ? date.toLocaleTimeString()
        : date.toLocaleDateString();
}
