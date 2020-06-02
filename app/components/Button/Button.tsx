import React, { useContext } from "react";
import { Text, TextStyle, StyleProp, ViewStyle } from "react-native";
import useStyle from "./Button.style";
import { TouchableRipple } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

interface ButtonProps {
    title: string;
    textStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    isDangerous?: boolean;
    onPress?: () => void;
}
const Button = (props: ButtonProps) => {
    const style = useStyle();
    const { theme } = useContext(ThemeContext);
    return (
        <TouchableRipple
            onPress={props.onPress}
            style={[
                style.container,
                props.isDangerous ? { backgroundColor: theme.Button.dangerousColor } : {},
                props.style,
            ]}
        >
            <Text numberOfLines={1} style={[style.text, props.textStyle]}>
                {props.title}
            </Text>
        </TouchableRipple>
    );
};

export default Button;
