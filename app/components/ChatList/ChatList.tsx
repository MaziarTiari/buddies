import React, { useState } from "react";
import { FlatList } from "react-native";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";
import { MessageListItem } from "../MessageListItem/MessageListItem";
import { response } from "../../../example_data/MessageListQueryResponse";

const ChatList = () => {
    const [items, setItems] = useState(response);
    return (
        <ScreenContentContainer>
            <FlatList
                style={{ width: "100%" }}
                data={items.sort((a, b) => (b.lastMessage > a.lastMessage ? 1 : -1))}
                renderItem={({ item }) => <MessageListItem {...item} />}
                keyExtractor={(item) => item.uuid}
            />
        </ScreenContentContainer>
    );
};

export default ChatList;
