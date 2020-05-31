import React, { useContext } from "react";
import useStyle from "./ProfileEditorPersonal.style";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import { View, Text } from "react-native";

const ProfileEditorPersonal = () => {
    const styles = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { userProfile: profile, saveProfile } = useContext(ProfileContext);
    navigation.setOptions({ title: translations.profile.personal_info_edit });

    return (
        <View>
        </View>
    )
};

export default ProfileEditorPersonal;
