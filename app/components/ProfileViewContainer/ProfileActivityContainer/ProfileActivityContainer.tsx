import React from "react";
import { Text } from "react-native";
import Color from "../../../utils/theme/color";
import AppScreen from "../../AppScreen/AppScreen";

const ActivityScreen = () => {
    return (
        <AppScreen>
            <Text style={{color: Color.secondaryText}}>Activity Screen</Text>
        </AppScreen>
    );
};

export default ActivityScreen;
