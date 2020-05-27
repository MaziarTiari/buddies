import React from "react";
import { View, Text } from "react-native";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";
import useStyle from "./ActionButton.style";

export interface ActionButtonProps {
    onPress: () => void;
    text: string;
}

const ActionButton = (Props: ActionButtonProps) => {
    const style = useStyle();
    return (
        <View style={style.overlay} pointerEvents="box-none">
            <View style={style.button}>
                <TouchableRippleCircle onPress={Props.onPress}>
                    <Text style={style.text}>{Props.text}</Text>
                </TouchableRippleCircle>
            </View>
        </View>
    );
};

export default ActionButton;
