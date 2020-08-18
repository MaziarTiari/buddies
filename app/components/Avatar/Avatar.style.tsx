import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useContext } from "react";
import { fontsizes, getLineHeight, getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            flexDirection: "row",
        },
        image: {
            width: getLineHeight(fontsizes.medium),
            aspectRatio: 1,
            borderRadius: getLineHeight(fontsizes.medium) / 2,
        },
        text: {
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            color: theme.App.primaryText,
            marginLeft: getResponsiveSize(10)
        }
    });
};

export default useStyle;