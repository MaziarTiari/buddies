import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { getResponsiveSize, fontsizes, getLineHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useFormStyle = () => {
    const { theme, themeType } = useContext(ThemeContext);
    return StyleSheet.create({
        contentContainer: {
            marginHorizontal: getResponsiveSize(30),
            paddingVertical: getResponsiveSize(30),
        },
        heading: {
            color: theme.App.primaryText,
            fontWeight: "bold",
            marginBottom: getResponsiveSize(20),
        },
        errorMessage: {
            color: theme.App.errorColor,
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
        },
        submitButton: {
            marginVertical: getResponsiveSize(20),
            alignSelf: "center",
        },
        buttonText: {
            color: themeType === "light" 
                ? theme.App.layoutBackground : theme.App.primaryText
        },
        timeRangeContainer: {
            display: "flex", 
            flexDirection: "row"
        }
    });
};

export default useFormStyle;