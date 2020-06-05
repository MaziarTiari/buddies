import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { getResponsiveSize, fontsizes, getLineHeight } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        list: {
            width: "100%",
        },
        container: {
            padding: getResponsiveSize(15),
            borderBottomWidth: 1,
            borderBottomStartRadius: getResponsiveSize(25),
            borderBottomEndRadius: getResponsiveSize(25),
            borderColor: theme.App.layoutBackground,
        },
        text: {
            color: theme.App.secondaryText,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
        },
        textTitle: {
            color: theme.App.primaryText,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            fontWeight: "bold",
        },
    });
};

export default useStyle;
