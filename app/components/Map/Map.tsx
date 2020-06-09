import React, { useContext } from "react";
import { Text } from "react-native";
import Container from "../Container/Container";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const Map = () => {
    const theme = useContext(ThemeContext).theme;
    return (
        <Container type="screen" layout="root">
            <Text style={{ color: theme.App.secondaryText }}>Map Screen</Text>
        </Container>
    );
};

export default Map;
