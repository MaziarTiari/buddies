import React, { useState } from "react";
import { FlatList } from "react-native";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";
import {
    MessageListItem,
    MessageListItemProps,
} from "../MessageListItem/MessageListItem";
import { response } from "../../../example_data/MessageListQueryResponse";
import { ChatContainerParams } from "../ChatContainer/ChatContainer";
import { RouteName } from "../../../App";

const ChatList = ({ navigation }: any) => {
    const [items, setItems] = useState(response);

    const handlePress = (pressedItem: MessageListItemProps) => {
        const params: ChatContainerParams = { title: pressedItem.displayName };
        navigation.navigate(RouteName.Chat.Chat, { ...params });
    };

    const handleLongPress = (pressedItem: MessageListItemProps) => {};

    return (
        <ScreenContentContainer>
            <FlatList
                style={{ width: "100%" }}
                data={items.sort((a, b) => (b.lastMessage > a.lastMessage ? 1 : -1))}
                renderItem={({ item }) => (
                    <MessageListItem
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
        </ScreenContentContainer>
    );
};

export default ChatList;
