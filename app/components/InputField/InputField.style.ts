import { StyleSheet } from "react-native";
import { fontsizes, getLineHeight, getResponsiveSize } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useStyle = () => {
    const theme = useContext(ThemeContext).theme;
    return StyleSheet.create({
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.App.menuBackground,
            flex: 1,
            borderRadius: getResponsiveSize(8),
        },
        textInput: {
            color: theme.App.primaryText,
            borderWidth: 0,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            flex: 1,
            marginVertical: getResponsiveSize(10),
        },
    });
};

export default useStyle;
