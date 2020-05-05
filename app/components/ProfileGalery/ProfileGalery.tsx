import React from "react";
import { Text } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";

const ProfileGalery = () => {
    return (
        <Container type="screen" layout="root">
            <Text style={{ color: Color.Theme.secondaryText }}>Profile Galery</Text>
        </Container>
    );
};

export default ProfileGalery;
