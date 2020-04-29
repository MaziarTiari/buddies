import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const ProfileActivity = () => {
    return (
        <ScreenContentContainer>
            <Text style={{ color: Color.secondaryText }}>Profile Activity</Text>
        </ScreenContentContainer>
    );
};

export default ProfileActivity;
