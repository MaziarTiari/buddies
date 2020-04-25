import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from '../../utils/theme/color';

interface ButtomStackNavIconProps {
    icon: string;
    focused: boolean;
}

export const ButtomStackNavIcon = ({icon, focused}: ButtomStackNavIconProps) => {
    return (
        <MaterialCommunityIcons
            name={icon}
            color={focused ? Color.primaryText : Color.secondaryText}
            size={26}
        />
    );
};