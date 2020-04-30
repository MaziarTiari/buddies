import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";

const ActivityList = () => {
    return (
        <Container layout="screen">
            <Text style={{ color: Color.secondaryText }}>Activity List Screen</Text>
        </Container>
    );
};

export default ActivityList;
