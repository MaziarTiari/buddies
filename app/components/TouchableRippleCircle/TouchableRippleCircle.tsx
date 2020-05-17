import React from "react";
import { View } from "react-native";
import style from "./TouchableRippleCircle.style";
import { TouchableRipple } from "react-native-paper";

export interface TouchableRippleCircleProps {
    children: JSX.Element;
    onPress: () => void;
}

const TouchableRippleCircle = (props: TouchableRippleCircleProps) => {
    return (
        <View style={style.outerContainer}>
            <TouchableRipple style={style.container} onPress={props.onPress}>
                {props.children}
            </TouchableRipple>
        </View>
    );
};

export default TouchableRippleCircle;
