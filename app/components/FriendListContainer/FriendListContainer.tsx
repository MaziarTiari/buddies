import React, { useState } from "react";
import { FlatList } from "react-native";
import AppScreen from "../AppScreen/AppScreen";
import { FiendList } from "../../../example_data/FetchedFriendList";
import { FriedListItem } from "../FriendListItem/FriedListItem";

const FriedListContainer = () => {
    const [items, setItems] = useState(FiendList);

    return (
        <AppScreen>
            <FlatList
                style={{ width: "100%" }}
                data={items}
                renderItem={({ item }) => <FriedListItem {...item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </AppScreen>
    );
};

export default FriedListContainer;