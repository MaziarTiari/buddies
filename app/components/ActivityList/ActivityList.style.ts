import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        backgroundContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: theme.App.layoutBackground,
        },
        backgroundSideContainer: {
            width: getResponsiveSize(140),
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            fontSize: fontsizes.small,
            color: theme.App.primaryText,
        },
    });
};

export default useStyle;
