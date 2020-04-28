import React, { useState } from "react";
import { FlatList } from "react-native";
import { FiendList } from "../../../example_data/FetchedFriendList";
import { FriedListItem } from "../FriendListItem/FriedListItem";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const FriendList = () => {
    const [items, setItems] = useState(FiendList);

    return (
        <ScreenContentContainer>
            <FlatList
                style={{ width: "100%" }}
                data={items}
                renderItem={({ item }) => <FriedListItem {...item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </ScreenContentContainer>
    );
};

export default FriendList;
