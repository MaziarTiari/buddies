import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";

const FeedList = () => {
    return (
        <Container layout="screen_centered">
            <Text style={{ color: Color.Theme.secondaryText }}>Feed</Text>
        </Container>
    );
};

export default FeedList;
