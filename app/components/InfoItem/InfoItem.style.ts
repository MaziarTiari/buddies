import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { fontsizes, getLineHeight } from '../../utils/font/font';

export const useInfoItemStyle = () => {
    const { theme } = useContext(ThemeContext);

    return StyleSheet.create({
        container: {
            flex: 2,
            flexDirection: "row",
        },
        key: {
            flex: 1,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.primaryText
        },
        value: {
            flex: 1,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.secondaryText
        }
    });
}