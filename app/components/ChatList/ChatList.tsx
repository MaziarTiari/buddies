import React, { useState } from "react";
import { FlatList } from "react-native";
import { response } from "../../../example_data/MessageListQueryResponse";
import { ChatParams } from "../Chat/Chat";
import { RouteName } from "../../utils/navigation/configuration";
import { ChatListItem, ChatListItemProps } from "../ChatListItem/ChatListItem";
import Container from "../Container/Container";

const ChatList = ({ navigation }: any) => {
    const [items, setItems] = useState(response);

    const handlePress = (pressedItem: ChatListItemProps) => {
        const params: ChatParams = { title: pressedItem.displayName };
        navigation.navigate(RouteName.Chat.Chat, { ...params });
    };

    const handleLongPress = (pressedItem: ChatListItemProps) => {};

    return (
        <Container layout="screen_centered">
            <FlatList
                style={{ width: "100%" }}
                data={items.sort((a, b) => (b.lastMessage > a.lastMessage ? 1 : -1))}
                renderItem={({ item }) => (
                    <ChatListItem
                        displayName={item.displayName}
                        isOnline={item.isOnline}
                        lastMessage={item.lastMessage}
                        unreadMessages={item.unreadMessages}
                        uuid={item.uuid}
                        relation={item.relation}
                        onPress={handlePress}
                        onLongPress={handleLongPress}
                    />
                )}
                keyExtractor={(item) => item.uuid}
            />
        </Container>
    );
};

export default ChatList;
