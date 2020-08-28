import React, { useContext } from "react";
import { View, StyleProp, ViewStyle, TextInputProps, StyleSheet } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";


export interface InputFieldProps extends TextInputProps {
    content: JSX.Element;
    leftComponent?: JSX.Element;
    rightComponent?: JSX.Element;
    style?: StyleProp<ViewStyle>;
}

export const InputFieldContainer = ({style, content, ...Props}: InputFieldProps) => {
    const { theme, themeType } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.App.inputBackground,
            flex: 1,
            borderRadius: getResponsiveSize(8),
            paddingHorizontal: getResponsiveSize(10),
        },
    });

    const LeftComponent = () => (Props.leftComponent ? Props.leftComponent : null);
    const RightComponent = () => (Props.rightComponent ? Props.rightComponent : null);

    return (
        <View style={[styles.inputContainer, style]}>
            <LeftComponent {...Props.leftComponent?.props} />
            {content}
            <RightComponent {...Props.rightComponent?.props} />
        </View>
    );
};

export default InputFieldContainer;
