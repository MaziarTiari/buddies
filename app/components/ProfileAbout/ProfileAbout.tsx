import React, { useContext } from "react";
import { Button, Text } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const ProfileAbout = ({ navigation }: any) => {
    const theme = useContext(ThemeContext).theme;
    const lang = useContext(LanguageContext);
    return (
        <Container type="screen" layout="root">
            <Text style={{ color: theme.App.secondaryText, marginVertical: 30 }}>
                {lang.translations.menu_activities}
            </Text>
            <Button title="Friends" onPress={() => navigation.navigate("FriendList")} />
        </Container>
    );
};

export default ProfileAbout;
