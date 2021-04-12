import React, { useContext, ReactNode } from "react";
import { Text, TextStyle, StyleProp, ViewStyle, TouchableOpacityProps } from "react-native";
import useButtonStyle from "./Button.style";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { TouchableHighlight } from "react-native";
import { Utilities } from '../../utils/AppUtilities'
import { TouchableDarken } from "../TouchableDarken/TouchableDarken";
import { View } from "react-native";
import Color from 'color';
import { colors } from "react-native-elements";
interface ButtonProps {
    title: string;
    textStyle?: StyleProp<TextStyle>;
    style?: ViewStyle;
    type?: "dangerous" | "secondary" | "primary" | "accept" | "action" | "active";
    onPress?: () => void;
    icon?: JSX.Element;
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
            case "accept": return "#12b17f";
            case "action": return "#178dd7";
            case "active": return theme.App.screenBackground;
        }
    }
    
    return (
        <TouchableHighlight
            underlayColor={Color(getBgColor()).darken(0.3).hex()}
            onPress={props.onPress}
            style={[
                styles.container,
                {backgroundColor: getBgColor()},
                props.style,
            ]}
        >
            <View style={{ display:"flex", flexDirection: "row"}} >
                <Text numberOfLines={1} style={[styles.text, props.textStyle]}>
                    {props.title}
                </Text>
                <View style={{marginLeft: 3}}>
                    {props.icon}
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default Button;
