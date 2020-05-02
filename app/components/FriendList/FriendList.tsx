import React, { useState } from "react";
import { FlatList } from "react-native";
import { users } from "../../../example_data/users";
import { FriedListItem } from "../FriendListItem/FriedListItem";
import Container from "../Container/Container";

const FriendList = () => {
    const [items, setItems] = useState(users);

    return (
        <Container layout="screen_centered">
            <FlatList
                style={{ width: "100%" }}
                data={items}
                renderItem={({ item }) => <FriedListItem {...item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </Container>
    );
};

export default FriendList;
