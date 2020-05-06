import React, { useContext } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const ProfileHeader = ({ navigation }: any) => {
    const theme = useContext(ThemeContext).theme;
    return (
        <View>
            <IconButton
                color={theme.App.secondaryText}
                icon="dots-vertical-circle-outline"
                onPress={() => {}} // tood
            />
        </View>
    )
}

export default ProfileHeader;
