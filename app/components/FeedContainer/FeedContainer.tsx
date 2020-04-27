import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import AppScreen from "../AppScreen/AppScreen";

const FeedContainer = () => {
    return (
        <AppScreen>
            <Text style={ {color: Color.secondaryText} }>Feed</Text>
        </AppScreen>
    );
};

export default FeedContainer;
