import React, { useContext } from "react";
import { Text } from "react-native";
import Container from "../Container/Container";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
//import MapView from "react-native-maps";

const Map = () => {
    const theme = useContext(ThemeContext).theme;
    return (
        <Container type="screen" layout="root">
            {/* <MapView    // TODO needs API Token
                style={{ alignSelf: "stretch", flex: 1 }}
                provider="google"
            /> */}
        </Container>
    );
};

export default Map;
