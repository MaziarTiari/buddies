import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const UserActivityContainer = () => {
    return (
        <ScreenContentContainer>
            <Text style={{color: Color.secondaryText}}>Activity Screen</Text>
        </ScreenContentContainer>
    );
};

export default UserActivityContainer;
