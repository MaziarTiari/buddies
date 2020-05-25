import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useContext } from "react";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        list: {
            width: "100%",
        },
        container: {
            padding: getResponsiveSize(15),
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomStartRadius: getResponsiveSize(25),
            borderBottomEndRadius: getResponsiveSize(25),
            borderColor: theme.App.layoutBackground,
        },
        text: {
            fontSize: fontsizes.medium,
            color: theme.App.primaryText,
        },
    });
};

export default useStyle;
