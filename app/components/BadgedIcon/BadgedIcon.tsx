import React from "react";
import { withBadge, BadgeProps } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";

interface BadgedIconProps {
    icon: string;
    size: number;
    color: string;
    value?: number;
    onPress?: () => void;
}

const BadgedIcon = (props: BadgedIconProps): JSX.Element => {

    const badgeOptions: BadgeProps = {
        badgeStyle: {
            right: props.size / 3,
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

    return props.onPress
        ? <TouchableRippleCircle onPress={props.onPress}>
            {badgedIcon}
        </TouchableRippleCircle>
        : badgedIcon;

}

export default BadgedIcon;