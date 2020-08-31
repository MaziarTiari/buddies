import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { getResponsiveSize, getLineHeight, fontsizes } from "../../utils/font/font";

const useButtonStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            borderRadius: getResponsiveSize(50),
            alignSelf: "baseline",
        },
        text: {
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            textAlign: "center",
            color: theme.App.primaryText,
            padding: getResponsiveSize(15),
            fontWeight: "600"
        },
    });
};

export default useButtonStyle;
