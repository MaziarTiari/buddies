import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";

const ActivityMap = () => {
    return (
        <Container layout="screen_centered">
            <Text style={{ color: Color.secondaryText }}>Activity Map Screen</Text>
        </Container>
    );
};

export default ActivityMap;
