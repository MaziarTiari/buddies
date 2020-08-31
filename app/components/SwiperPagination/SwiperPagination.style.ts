import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { getResponsiveSize, fontsizes } from "../../utils/font/font";

const useSwiperPaginationStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        paginationContainer: {
            position: "absolute",
            right: 0,
            top: 0,
            paddingVertical: getResponsiveSize(5),
            paddingHorizontal: getResponsiveSize(10),
            borderRadius: getResponsiveSize(15),
            backgroundColor: theme.App.screenBackground,
            margin: getResponsiveSize(12),
        },
        paginationText: {
            color: theme.App.primaryText,
            fontSize: fontsizes.small,
        },
    });
}

export default useSwiperPaginationStyle;
