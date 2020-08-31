import React, { useContext, ReactNode } from "react";
import { Text, TextStyle, StyleProp, ViewStyle, TouchableOpacityProps } from "react-native";
import useButtonStyle from "./Button.style";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { TouchableHighlight } from "react-native";
import { Utilities } from '../../utils/AppUtilities'
import { TouchableDarken } from "../TouchableDarken/TouchableDarken";

interface ButtonProps {
    title: string;
    textStyle?: StyleProp<TextStyle>;
    style?: ViewStyle;
    type?: "dangerous" | "secondary" | "primary";
    onPress?: () => void;
}
const Button = (props: ButtonProps) => {
    const styles = useButtonStyle();
    const { theme } = useContext(ThemeContext);

    const getBgColor = () => {
        if (!props.type) {
            return props.style?.backgroundColor || theme.Button.primary;
        }
        switch(props.type) {
            case "primary": return theme.Button.primary;
            case "dangerous": return "#8C113C";
            case "secondary": return theme.Button.secondary;
        }
    }
    
    return (
        <TouchableHighlight
            underlayColor={Utilities.LightenDarkenColor(getBgColor(), -30)}
            onPress={props.onPress}
            style={[
                styles.container,
                {backgroundColor: getBgColor()},
                props.style,
            ]}
        >
            <Text numberOfLines={1} style={[styles.text, props.textStyle]}>
                {props.title}
            </Text>
        </TouchableHighlight>
    );
};

export default Button;
