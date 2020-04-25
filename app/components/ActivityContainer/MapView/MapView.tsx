import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../../../utils/theme/color";
import AppScreen from "../../AppScreen/AppScreen";
import { color } from "react-native-reanimated";

const ActivityMapView = () => {
    return (
        <AppScreen>
            <Text style={{ color: Color.secondaryText }}>Activity Map Screen</Text>
        </AppScreen>
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

export default ActivityMapView;
