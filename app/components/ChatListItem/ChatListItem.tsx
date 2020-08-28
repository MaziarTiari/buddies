import React, { useContext } from "react";
import { View, Text } from "react-native";
import useStyle from "./ChatListItem.style";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { IChatPartner, Relation } from "../../dev/example_data/MessageListQueryResponse";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export interface ChatListItemProps {
    chatPartner: IChatPartner;
    onPress?: () => void;
    onLongPress?: () => void;
}

export const ChatListItem = (Props: ChatListItemProps) => {
    const translate = useContext(LanguageContext).translations;

    function getRelationText(relation: Relation): string {
        switch (relation) {
            case Relation.FRIEND:
                return translate.is_friend;
            case Relation.STRANGER:
                return translate.is_stranger;
            case Relation.BLOCKED:
                return translate.is_blocked;
            case Relation.GROUP:
                return translate.is_group;
        }
    }

    const styles = useStyle();
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
            userId={Props.chatPartner.uuid}
            isOnline={Props.chatPartner.isOnline}
            rightComponent={rightComponent}
            title={Props.chatPartner.displayName}
            subTitle={getRelationText(Props.chatPartner.relation)}
            onPress={Props.onPress}
            onLongPress={Props.onLongPress}
        />
    );
};

function getFormattedDateText(date: Date): string {
    return date.getDate() == new Date().getDate()
        ? date.toLocaleTimeString()
        : date.toLocaleDateString();
}
