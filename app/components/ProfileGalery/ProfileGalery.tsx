import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const ProfileGalery = () => {
    return (
        <ScreenContentContainer>
            <Text style={{ color: Color.secondaryText }}>Profile Galery</Text>
        </ScreenContentContainer>
    );
};

export default ProfileGalery;
