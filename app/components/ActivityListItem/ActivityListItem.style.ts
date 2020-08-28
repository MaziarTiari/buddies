import { StyleSheet } from "react-native";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useContext } from "react";

export const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: theme.App.screenBackground,
        },
        outerContainer: {
            borderBottomWidth: 1,
            borderColor: theme.App.devider,
            borderBottomStartRadius: getResponsiveSize(25),
            borderBottomEndRadius: getResponsiveSize(25),
        },
        innerContainer: {
            marginHorizontal: getResponsiveSize(15),
            marginVertical: getResponsiveSize(25),
            overflow: "hidden",
        },
        imageContainer: {
            flex: 3,
            aspectRatio: 1,
            backgroundColor: "black",
            marginRight: getResponsiveSize(15),
        },
        image: {
            flex: 1,
            aspectRatio: 1,
            resizeMode: "contain",
        },
        infoContainer: {
            flex: 7,
        },
        titleText: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            fontWeight: "bold",
            color: theme.App.primaryText,
        },
        infoText: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.secondaryText,
            marginLeft: getResponsiveSize(5),
        },
        infoIconContainer: {
            flexDirection: "row",
            marginVertical: getResponsiveSize(1),
        },
    });

    return { theme: theme, styles: styles };
};
