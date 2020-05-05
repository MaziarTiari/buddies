import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";

const ActivityMap = () => {
    return (
        <Container type="screen" layout="root">
            <Text style={{ color: Color.Theme.secondaryText }}>Activity Map Screen</Text>
        </Container>
    );
};

export default ActivityMap;
