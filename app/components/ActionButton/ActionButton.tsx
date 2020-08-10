import React, { useContext } from "react";
import { View } from "react-native";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";
import useStyle from "./ActionButton.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { getResponsiveSize } from "../../utils/font/font";

export interface ActionButtonChildProps {
    onPress: () => void;
    icon: string;
}

export interface ActionButtonProps extends ActionButtonChildProps {
    children?: ActionButtonChildProps[];
    showChildren?: boolean;
}

const ActionButton = (Props: ActionButtonProps) => {

    const style = useStyle();
    const { theme } = useContext(ThemeContext);

    const renderButton = (props: ActionButtonChildProps, isChild: boolean, index?: number): JSX.Element => (
        <View style={isChild ? style.childButton : style.button} key={index}>
            <TouchableRippleCircle onPress={props.onPress}>
                <MaterialCommunityIcons
                    name={props.icon}
                    color={theme.App.primaryText}
                    size={isChild ? getResponsiveSize(30) : getResponsiveSize(50)}
                />
            </TouchableRippleCircle>
        </View>
    );

    return (
        <View style={style.overlay} pointerEvents="box-none">
            {Props.showChildren && Props.children && Props.children.map((child, index) => renderButton(child, true, index))}
            {renderButton(Props, false)}
        </View>
    );

};

export default ActionButton;
