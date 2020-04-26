import React, { useState } from "react";
import { FlatList } from "react-native";
import AppScreen from "../AppScreen/AppScreen";
import { MessageListItem } from "../MessageListItem/MessageListItem";
import { response } from "../../../example_data/MessageListQueryResponse";

const MessageContainer = () => {
    const [items, setItems] = useState(response);

    return (
        <AppScreen>
            <FlatList
                style={{ width: "100%" }}
                data={items.sort((a, b) => (b.lastMessage > a.lastMessage ? 1 : -1))}
                renderItem={({ item }) => <MessageListItem {...item} />}
                keyExtractor={(item) => item.uuid}
            />
        </AppScreen>
    );
};

export default MessageContainer;
