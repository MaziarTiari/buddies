import React, { useContext } from "react";
import { View, Text } from "react-native";
import useChatListItemStyle from "./ChatListItem.style";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { IChatPartner, Relation } from "../../dev/example_data/MessageListQueryResponse";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { useLocalDate } from "../../hooks/useLocalDate";
export interface ChatListItemProps {
    chatPartner: IChatPartner;
    onPress?: () => void;
    onLongPress?: () => void;
}

export const ChatListItem = (Props: ChatListItemProps) => {
    const { translations } = useContext(LanguageContext);
    const { getLocalDateString } = useLocalDate();
    // function getRelationText(relation: Relation): string {
    //     switch (relation) {
    //         case Relation.FRIEND:
    //             return translations.is_friend;
    //         case Relation.STRANGER:
    //             return translations.is_stranger;
    //         case Relation.BLOCKED:
    //             return translations.is_blocked;
    //         case Relation.GROUP:
    //             return translations.is_group;
    //     }
    // }

    const styles = useChatListItemStyle();
    const rightComponent = (
        <View style={styles.rightContainer}>
            <Text style={styles.lastMessageText}>
                {getLocalDateString(Props.chatPartner.lastUpdate)}
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
            userId={Props.chatPartner.chatId}
            isOnline={false}
            rightComponent={rightComponent}
            title={Props.chatPartner.displayName}
            subTitle={Props.chatPartner.username}
            onPress={Props.onPress}
            onLongPress={Props.onLongPress}
            avatar={Props.chatPartner.avatar}
        />
    );
};

function getFormattedDateText(date: Date): string {
    return date.getDate() == new Date().getDate()
        ? date.toLocaleTimeString()
        : date.toLocaleDateString();
}
