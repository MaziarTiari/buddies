import { useContext } from "react";
import { StyleSheet } from "react-native";
import { getResponsiveSize, fontsizes, getLineHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useErrorModalStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        modalBackground: {
            backgroundColor: theme.App.darkenBackground,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        modalContainer: {
            padding: getResponsiveSize(24),
            borderRadius: getResponsiveSize(24),
            backgroundColor: theme.App.menuBackground,
            maxWidth: "80%",
        },
        modalText: {
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            color: theme.App.primaryText,
        },
        button: {
            alignSelf: "center",
            marginTop: getResponsiveSize(24),
        }
    })
};

export default useErrorModalStyle;