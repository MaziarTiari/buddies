import React, { useContext } from "react";
import { Text } from "react-native";
import Container from "../Container/Container";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const ProfileGalery = () => {
    const theme = useContext(ThemeContext).theme;

    return (
        <Container type="screen" layout="root">
            <Text style={{ color: theme.App.secondaryText }}>Profile Galery</Text>
        </Container>
    );
};

export default ProfileGalery;
