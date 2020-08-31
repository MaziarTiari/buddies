import { StyleSheet } from "react-native";
import { fontsizes, getLineHeight, getResponsiveSize } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useContext } from "react";

export function useInfoWithIconStyle() {
    const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        infoText: {
            flex: 1,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.secondaryText,
            marginLeft: getResponsiveSize(5),
        },
        infoIconContainer: {
            flexDirection: "row",
            marginVertical: getResponsiveSize(1),
        },
    });

    return {
        styles: styles,
        theme: theme
    }
}