import { StyleSheet } from "react-native";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useContext } from "react";

export const useStyle = () => {
    const theme = useContext(ThemeContext).theme;
    const styles = StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: theme.App.screenBackground,
        },
        container: {
            borderBottomWidth: 1,
            borderColor: theme.App.layoutBackground,
            borderBottomStartRadius: getResponsiveSize(25),
            borderBottomEndRadius: getResponsiveSize(25),
            paddingTop: getResponsiveSize(20),
            paddingBottom: getResponsiveSize(45),
            position: "relative",
        },
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        iconText: {
            color: theme.App.basicItem,
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
        },
        bodyContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        image: {
            width: getResponsiveSize(150),
            height: getResponsiveSize(150),
            alignSelf: "center",
            borderRadius: getResponsiveSize(25),
        },
        infoContainer: {
            flex: 1,
            marginLeft: getResponsiveSize(15),
            justifyContent: "space-between",
            marginRight: getResponsiveSize(4),
        },
        title: {
            color: theme.App.primaryText,
            fontSize: fontsizes.medium,
            fontWeight: "bold",
            lineHeight: getLineHeight(fontsizes.medium),
        },
        address: {
            marginBottom: getResponsiveSize(4),
        },
        info: {
            color: theme.App.primaryText,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
        },
        iconContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "stretch",
        },
        icon: {
            margin: 0,
            alignSelf: "flex-end",
        },
        favoriteIcon: {
            position: "absolute",
            top: "97%",
        },
    });

    return { theme: theme, styles: styles };
};
