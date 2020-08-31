import { useContext } from "react";
import { StyleSheet, Platform } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { fontsizes, getLineHeight, getResponsiveSize, getResponsiveHeight } from "../../utils/font/font";
import { Device } from "../../utils/device/Device";

const device = new Device();

const useCategorizedInputEditorStyle = () => {
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
        pickerInput: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            paddingVertical: getResponsiveSize(5),
        },
        autoComplete: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            marginVertical: getResponsiveSize(5),
            paddingHorizontal: getResponsiveSize(0),
            color: theme.App.primaryText,
            paddingVertical: Platform.OS === 'ios'
                ? getResponsiveHeight(15)
                : device.height > 750 ? getResponsiveHeight(5) : 0,
        },
        autoCompleteContainer: {
            backgroundColor: theme.App.inputBackground,
            borderWidth: 1,
            marginVertical: getResponsiveSize(15),
            borderColor: theme.App.inputBorderColor,
            borderRadius: getResponsiveSize(8),
            paddingHorizontal: getResponsiveSize(10),
        },
        autoCompleteList: {
            backgroundColor: theme.App.inputBackground,
            borderWidth: 1,
            borderColor: theme.App.inputBorderColor,
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
            alignItems:"center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: getResponsiveSize(30),
        },
        button: {
            borderRadius: getResponsiveSize(10),
        },
        buttonText: {
            fontSize: fontsizes.small,
            padding: getResponsiveSize(8)
        }
    });
};

export default useCategorizedInputEditorStyle;
