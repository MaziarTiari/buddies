import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const ActivityList = () => {
    return (
        <ScreenContentContainer>
            <Text style={{color: Color.secondaryText}}>Activity List Screen</Text>
        </ScreenContentContainer>
    );
};

export default ActivityList;
