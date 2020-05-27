import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        galleryContainer: {
            width: "100%",
            aspectRatio: 1, // sets the height equal to width
        },
        primaryInfoContainer: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
        },
        innerInfoContainer: {
            padding: getResponsiveSize(15),
            maxWidth: "50%",
        },
        innerRippleContainer: {
            alignItems: "center",
        },
        headline: {
            fontSize: fontsizes.medium,
            fontWeight: "bold",
            color: theme.App.primaryText,
            lineHeight: getLineHeight(fontsizes.medium),
        },
        text: {
            fontSize: fontsizes.small,
            color: theme.App.secondaryText,
            lineHeight: getLineHeight(fontsizes.small),
        },
        secondaryInfoContainer: {
            width: "100%",
            padding: getResponsiveSize(15),
            borderTopWidth: 2,
            borderTopStartRadius: getResponsiveSize(25),
            borderTopEndRadius: getResponsiveSize(25),
            borderColor: theme.App.layoutBackground,
        },
        smallHeadline: {
            fontSize: fontsizes.small,
            color: theme.App.primaryText,
            lineHeight: getLineHeight(fontsizes.small),
        },
        columnContainer: {
            flexDirection: "row",
        },
        column: {
            width: "50%",
        },
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
        image: {
            width: "100%",
            flex: 1,
            resizeMode: "contain",
            backgroundColor: "black",
        },
    });
};

export default useStyle;
