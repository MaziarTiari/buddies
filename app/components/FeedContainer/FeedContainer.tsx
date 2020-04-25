import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import AppScreen from "../AppScreen/AppScreen";
import { color } from "react-native-reanimated";

const FeedContainer = () => {
    return (
        <AppScreen>
            <Text style={ {color: Color.secondaryText} }>Feed</Text>
        </AppScreen>
    );
};

export default FeedContainer;
