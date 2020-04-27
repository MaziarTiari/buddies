import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const UserProfile = () => {
    return (
        <ScreenContentContainer >
            <Text style={{color: Color.secondaryText}}>About Screen</Text>
        </ScreenContentContainer>
    );
};


export default UserProfile;
