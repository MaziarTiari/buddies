import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../../../utils/theme/color";
import AppScreen from "../../AppScreen/AppScreen";

const ActivityListView = () => {
    return (
        <AppScreen>
            <Text style={{color: Color.secondaryText}}>Activity List Screen</Text>
        </AppScreen>
    );
};

export default ActivityListView;
