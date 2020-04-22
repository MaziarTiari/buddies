import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HeaderButtonProps {
    icon: string;
    onPress(): void;
}

const HeaderButton = (props: HeaderButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ margin: 10 }}>
            <MaterialCommunityIcons name={props.icon} color="black" size={32} />
        </TouchableOpacity>
    );
};

export default HeaderButton;
