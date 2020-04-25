import React from "react";
import { Text } from "react-native";
import Color from "../../../utils/theme/color";
import AppScreen from "../../AppScreen/AppScreen";

const AboutScreen = () => {
    return (
        <AppScreen >
            <Text style={{color: Color.secondaryText}}>About Screen</Text>
        </AppScreen>
    );
};


export default AboutScreen;
