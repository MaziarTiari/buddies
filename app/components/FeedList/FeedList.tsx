import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const FeedList = () => {
    return (
        <ScreenContentContainer>
            <Text style={{ color: Color.secondaryText }}>Feed</Text>
        </ScreenContentContainer>
    );
};

export default FeedList;
