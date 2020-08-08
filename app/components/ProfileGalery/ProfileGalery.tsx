import React, { useContext } from "react";
import Container from "../Container/Container";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import ActionButton from "../ActionButton/ActionButton";

const ProfileGalery = () => {
    const theme = useContext(ThemeContext).theme;

    const handleAddPressed = () => {

    }

    return (
        <Container type="screen" layout="root">
            <ActionButton text="+" onPress={handleAddPressed} />
        </Container>
    );

};

export default ProfileGalery;
