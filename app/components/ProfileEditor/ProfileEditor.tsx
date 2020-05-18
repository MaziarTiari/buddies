import React, { useContext } from "react";
import { View, Text } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const ProfileEditor = ({ navigation }: any) => {
    const { translations } = useContext(LanguageContext);
    navigation.setOptions({ title: translations.menu_profile_editor });

    return (
        <Container type="screen" layout="root">
            <View>
                <Text>Profile Editor</Text>
            </View>
        </Container>
    );
};

export default ProfileEditor;
