import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import Color from "../../utils/theme/color";

const ProfileHeader = ({ navigation }: any) => (
    <View>
        <IconButton
            color={Color.secondaryText}
            icon="dots-vertical-circle-outline"
            onPress={() => {}} // tood
        />
    </View>
);

export default ProfileHeader;
