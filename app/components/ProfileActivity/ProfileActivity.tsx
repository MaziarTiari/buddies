import React, { useContext } from "react";
import { Text } from "react-native";
import Container from "../Container/Container";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { useActivities } from "../../Hooks/useActivities";

const ProfileActivity = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(SessionContext);
    const { activities } = useActivities("user", user.id);
    
    return (
        <Container type="screen" layout="root">
            <Text style={{ color: theme.App.secondaryText }}>Profile Activity</Text>
        </Container>
    );
};

export default ProfileActivity;
