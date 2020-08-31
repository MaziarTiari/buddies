import { useContext } from "react";
import { StyleSheet } from "react-native";
import { getResponsiveSize, fontsizes, getLineHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useLoadingModalStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        modalBackground: {
            backgroundColor: theme.App.darkenBackground,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        modalContainer: {
            padding: getResponsiveSize(32),
            borderRadius: getResponsiveSize(24),
            backgroundColor: theme.App.screenBackground,
            shadowColor: "#0000",
            shadowOffset: {
                width: 5,
                height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 24
        },
        modalText: {
            marginTop: getResponsiveSize(16),
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            color: theme.App.primaryText
        }
    })
};

export default useLoadingModalStyle;