import React, { useContext } from "react";
import { View } from "react-native";
import Container from "../Container/Container";
import useStyle from "./ProfileEditorPersonal.style";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";

const ProfileEditorPersonal = () => {
    const style = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { profile, saveProfile } = useContext(ProfileContext);

    navigation.setOptions({ title: translations.profile_personal_info_edit });

    return <Container layout="root" type="screen"></Container>;
};

export default ProfileEditorPersonal;
