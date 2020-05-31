import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { getResponsiveSize, getLineHeight, fontsizes } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            //borderWidth: 1,
            borderColor: theme.App.layoutBackground,
            backgroundColor: "#C2821F",
            borderRadius: getResponsiveSize(50),
            alignSelf: "baseline",
        },
        text: {
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            textAlign: "center",
            color: theme.App.primaryText,
            padding: getResponsiveSize(15),
            fontWeight: "bold"
        },
    });
};

export default useStyle;
