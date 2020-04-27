import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const ActivityMap = () => {
    return (
        <ScreenContentContainer>
            <Text style={{ color: Color.secondaryText }}>Activity Map Screen</Text>
        </ScreenContentContainer>
    );
};

export default ActivityMap;
