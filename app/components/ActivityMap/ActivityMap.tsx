import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";
import { color } from "react-native-reanimated";

const ActivityMap = () => {
    return (
        <ScreenContentContainer>
            <Text style={{ color: Color.secondaryText }}>Activity Map Screen</Text>
        </ScreenContentContainer>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.screenBackground,
    },
    text: {
        color: Color.secondaryText,
    },
});

export default ActivityMap;
