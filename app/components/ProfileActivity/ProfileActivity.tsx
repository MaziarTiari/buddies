import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";

const ProfileActivity = () => {
    return (
        <Container layout="screen_centered">
            <Text style={{ color: Color.secondaryText }}>Profile Activity</Text>
        </Container>
    );
};

export default ProfileActivity;
