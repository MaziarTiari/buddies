import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HeaderButtonProps {
    icon: string;
    color: string;
    onPress: () => void;
}

const IconButton = (Props: HeaderButtonProps) => {
    return (
        <TouchableOpacity onPress={Props.onPress} style={{ margin: 10 }}>
            <MaterialCommunityIcons name={Props.icon} color={Props.color} size={32} />
        </TouchableOpacity>
    );
};

export default IconButton;
