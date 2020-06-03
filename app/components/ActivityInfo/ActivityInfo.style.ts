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
        },
        image: {
            width: "100%",
            flex: 1,
            resizeMode: "contain",
            backgroundColor: "black",
        }
    });
};

export default useStyle;
