import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { getResponsiveSize, getLineHeight, fontsizes } from "../../utils/font/font";

const useButtonStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            borderRadius: getResponsiveSize(10),
            alignSelf: "baseline",
            padding: getResponsiveSize(9),
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            textAlign: "center",
            color: theme.App.primaryText,            
            fontWeight: "600"
        },
    });
};

export default useButtonStyle;
