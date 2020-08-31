import { useContext } from "react";
import { StyleSheet, Platform } from "react-native";
import { getResponsiveSize, getResponsiveHeight, fontsizes, getLineHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useFormTextInputStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            borderWidth: 1,
            marginVertical: getResponsiveHeight(5),
            paddingHorizontal: getResponsiveSize(10)
        },
        input: {
            color: theme.App.primaryText,
            paddingVertical: getResponsiveSize(15),
        }
    });
};

export default useFormTextInputStyle;