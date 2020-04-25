import React from "react";
import { Text } from "react-native";
import Color from "../../../utils/theme/color";
import AppScreen from "../../AppScreen/AppScreen";

const GaleryScreen = () => {
    return (
        <AppScreen>
            <Text style={{color: Color.secondaryText}}>Galery Screen</Text>
        </AppScreen>
    );
};

export default GaleryScreen;
