import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { getResponsiveSize, getLineHeight, fontsizes } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: theme.App.layoutBackground,
            backgroundColor: theme.App.primaryItem,
            borderRadius: getResponsiveSize(8),
            alignSelf: "baseline",
        },
        text: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            textAlign: "center",
            color: theme.App.primaryText,
            padding: getResponsiveSize(10),
        },
    });
};

export default useStyle;
