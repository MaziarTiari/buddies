import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { fontsizes, getLineHeight, getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000AA",
        },
        modalView: {
            backgroundColor: theme.App.screenBackground,
            width: getResponsiveSize(380),
            position: "absolute",
            padding: getResponsiveSize(20),
        },
        headline: {
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            fontWeight: "bold",
            textAlign: "center",
            margin: getResponsiveSize(10),
            color: theme.App.primaryText,
        },
        picker: {
            borderWidth: 1,
            borderColor: theme.App.layoutBackground,
            backgroundColor: theme.App.menuBackground,
            borderRadius: getResponsiveSize(8),
            paddingVertical: getResponsiveSize(15),
            paddingHorizontal: getResponsiveSize(10),
            marginTop: getResponsiveSize(15),
        },
        autoComplete: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            paddingVertical: getResponsiveSize(10),
            color: theme.App.primaryText,
        },
        autoCompleteContainer: {
            backgroundColor: theme.App.menuBackground,
            borderWidth: 1,
            marginTop: getResponsiveSize(15),
            borderColor: theme.App.layoutBackground,
            borderRadius: getResponsiveSize(8),
            paddingHorizontal: getResponsiveSize(10),
        },
        autoCompleteList: {
            backgroundColor: theme.App.menuBackground,
            borderWidth: 1,
            borderColor: theme.App.layoutBackground,
            margin: 0,
            maxHeight: getResponsiveSize(185), // max 4 items visible
        },
        autoCompleteItemContainer: {
            padding: getResponsiveSize(12),
        },
        autoCompleteItemText: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.primaryText,
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: getResponsiveSize(30),
        },
    });
};

export default useStyle;
