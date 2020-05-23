import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { fontsizes, getLineHeight, getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            width: "100%",
            padding: getResponsiveSize(15),
            borderTopWidth: 2,
            borderTopStartRadius: getResponsiveSize(25),
            borderTopEndRadius: getResponsiveSize(25),
            borderColor: theme.App.layoutBackground,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        headline: {
            fontSize: fontsizes.medium,
            fontWeight: "bold",
            lineHeight: getLineHeight(fontsizes.medium),
            color: theme.App.primaryText,
        },
    });
};

export default useStyle;
