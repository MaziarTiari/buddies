import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const UserFotoGalery = () => {
    return (
        <ScreenContentContainer>
            <Text style={{color: Color.secondaryText}}>Galery Screen</Text>
        </ScreenContentContainer>
    );
};

export default UserFotoGalery;
