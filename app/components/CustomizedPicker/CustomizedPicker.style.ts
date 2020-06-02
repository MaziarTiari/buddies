import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        field: {
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
        },
        label: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.primaryText,
        },
        modal: {
            backgroundColor: theme.App.menuBackground,
        },
        header: {
            padding: getResponsiveSize(15),
            alignItems: "center",
        },
        headerText: {
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            fontWeight: "bold",
            color: theme.App.primaryText,
        },
        option: {
            padding: getResponsiveSize(12),
        },
    });
};

export default useStyle;
