import React, { useState, useMemo, useContext, useEffect } from "react";
import { FlatList, View } from "react-native";
import { ChatContext } from "../../context/ChatContext/ChatContext";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import {
    IChatPartner, Relation,
} from "../../dev/example_data/MessageListQueryResponse";
import useAppNavigation from "../../hooks/useAppNavigation";
import { getResponsiveSize } from "../../utils/font/font";
import { ChatListItem } from "../ChatListItem/ChatListItem";
import Container from "../Container/Container";

function ChatList() {
    const { navigation } = useAppNavigation();

    const { user } = useContext(SessionContext);
    const { chats } = useContext(ChatContext);
    const { userAvatars } = useContext(ProfileContext);

    const chatPartners = useMemo(() => {
        const res: IChatPartner[] = [];
        Promise.all(chats.map(c => {
            const partner = c.members.find(m => m.userId !== user.id)!;
            let lastTimeOnChat = c.members
                .find(m => m.userId === user.id)!.lastTimeOnChat;
            const avatar = userAvatars.find(a => a.userId === partner.userId)!;
            res.push({
                username: avatar.username,
                memberUserId: avatar.userId,
                displayName: avatar.firstname,
                lastUpdate: c.messages[0].sentAt,
                chatId: c.id,
                avatar: avatar.avatar === null ? undefined : avatar.avatar,
                unreadMessages: c.messages
                    .filter(m => m.sentAt > lastTimeOnChat).length
            });
            return c;
        }));
        return res;
    }, [chats])

    const handlePress = (chatPartner: IChatPartner) => {
        navigation.navigateToChat({
            displayName: chatPartner.displayName, 
            memberIds: [chatPartner.memberUserId, user.id]
        })
    };

    return (
        <Container type="screen" layout="root">
            <Container type="component" layout="root">
                    <FlatList
                        style={{paddingHorizontal: getResponsiveSize(15), marginHorizontal: 1}}
                        data={chatPartners}
                        renderItem={({item: chatPartner}) => 
                            <ChatListItem 
                                chatPartner={chatPartner} 
                                onPress={() => handlePress(chatPartner)}
                            />
                        }
                        keyExtractor={c => c.chatId}
                    />
            </Container>
        </Container>
    );
};

export default ChatList;
