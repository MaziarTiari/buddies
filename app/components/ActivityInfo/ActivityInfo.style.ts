import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { fontsizes, getLineHeight, getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        headline: {
            fontSize: fontsizes.medium,
            fontWeight: "bold",
            color: theme.App.primaryText,
            lineHeight: getLineHeight(fontsizes.medium),
        },
        linkHeadline: {
            fontSize: fontsizes.medium,
            fontWeight: "bold",
            color: theme.App.secondaryInteractiveItem,
            lineHeight: getLineHeight(fontsizes.medium),
        },
        linkText: {
            fontSize: fontsizes.small,
            color: theme.App.secondaryInteractiveItem,
            lineHeight: getLineHeight(fontsizes.small),
        },
        primaryInfoContainer: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingRight: getResponsiveSize(15),
        },
        innerInfoContainer: {
            padding: getResponsiveSize(15),
            flex: 1,
        },
        innerRippleContainer: {
            alignItems: "center",
        },
        text: {
            fontSize: fontsizes.small,
            color: theme.App.secondaryText,
            lineHeight: getLineHeight(fontsizes.small),
        },
        galleryContainer: {
            width: "100%",
            aspectRatio: 1, // sets the height equal to width
            borderBottomWidth: 1,
            borderBottomColor: theme.App.devider
        },
        image: {
            width: "100%",
            flex: 1,
            resizeMode: "contain",
            backgroundColor: "black",
        },
        imageEditContainer: {
            position: "absolute",
            bottom: 0,
            right: 0,
        },
        buttonContainer: {
            flexDirection: "row",
        },
        button: {
            flex: 1,
            borderColor: theme.App.devider,
            borderWidth: 1,
            borderRadius: 0,
            backgroundColor: theme.App.menuBackground,

        }
    });
};

export default useStyle;
