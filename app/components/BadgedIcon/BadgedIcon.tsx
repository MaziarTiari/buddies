import React from "react";
import { withBadge, BadgeProps } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { TouchableDarken } from "../TouchableDarken/TouchableDarken";
import { TouchableNativeFeedback, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { TouchableOpacityProps, ViewStyle } from "react-native";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { Utilities } from "../../utils/AppUtilities";
import Color from "color";

interface BadgedIconProps {
    icon: string;
    size: number;
    color: string;
    value?: number;
    onPress?: () => void;
    style?: ViewStyle;
}

const BadgedIcon = (props: BadgedIconProps): JSX.Element => {

    const r = 0.3 * props.size;
    const badgeOptions: BadgeProps = {
        badgeStyle: {
            right: (r - getResponsiveSize(r)) + r,
            scaleX: getResponsiveSize(1.2),
            scaleY: getResponsiveSize(1.2),
        },
    };

    const BadgedIcon = (props.value !== undefined && props.value > 0)
        ? withBadge(props.value, badgeOptions)(MaterialCommunityIcons)
        : MaterialCommunityIcons;

    const badgedIcon = <BadgedIcon
        color={props.color}
        name={props.icon}
        size={props.size}
    />

    let underlayColor = Color(props.color).rgb();
    const rgba = underlayColor
        ? `rgba(${underlayColor?.red},${underlayColor?.green},${underlayColor?.blue},0.3)`
        : "rgba(0,0,0,0.3)";

    return props.onPress
        ? <TouchableHighlight 
            underlayColor={rgba}
            style={[{borderRadius: 50, alignItems: "center"} ,props.style]} 
            onPress={props.onPress}
        >
            {badgedIcon}
        </TouchableHighlight>
        : badgedIcon;

}

export default BadgedIcon;