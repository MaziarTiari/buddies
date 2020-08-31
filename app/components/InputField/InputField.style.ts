import { StyleSheet } from "react-native";
import { fontsizes, getLineHeight, getResponsiveSize } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useInputFieldStyle = () => {
    const theme = useContext(ThemeContext).theme;
    return StyleSheet.create({
        textInput: {
            color: theme.App.primaryText,
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            flex: 1,
            height:"100%",
        },
    });
};

export default useInputFieldStyle;
