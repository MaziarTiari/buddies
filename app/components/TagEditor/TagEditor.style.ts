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
            margin: 20,
            backgroundColor: theme.App.screenBackground,
            width: getResponsiveSize(350),
            minHeight: getResponsiveSize(275),
            position: "absolute",
        },
        headline: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            fontWeight: "bold",
            textAlign: "center",
            padding: getResponsiveSize(15),
            color: theme.App.primaryText,
        },
        picker: {
            borderWidth: 1,
            borderColor: theme.App.layoutBackground,
            backgroundColor: theme.App.menuBackground,
            padding: getResponsiveSize(15),
            margin: getResponsiveSize(10),
        },
        autoComplete: {
            padding: getResponsiveSize(10),
            backgroundColor: theme.App.menuBackground,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.primaryText,
        },
        autoCompleteContainer: {
            borderWidth: 1,
            margin: getResponsiveSize(10),
            borderColor: theme.App.layoutBackground,
        },
        autoCompleteList: {
            marginHorizontal: getResponsiveSize(10),
            backgroundColor: theme.App.menuBackground,
            borderWidth: 1,
            borderColor: theme.App.layoutBackground,
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
            justifyContent: "flex-end",
        },
        button: {
            padding: getResponsiveSize(10),
        },
    });
};

export default useStyle;
