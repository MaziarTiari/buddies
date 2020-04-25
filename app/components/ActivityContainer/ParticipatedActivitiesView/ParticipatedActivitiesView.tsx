import React from "react";
import { Text } from "react-native";
import Color from "../../../utils/theme/color";
import AppScreen from "../../AppScreen/AppScreen";

const ParticipatedActivitiesView = () => {
    return (
        <AppScreen>
            <Text style={{color: Color.secondaryText}}>
                Participated Activities Screen
            </Text>
        </AppScreen>
    );
};

export default ParticipatedActivitiesView;
