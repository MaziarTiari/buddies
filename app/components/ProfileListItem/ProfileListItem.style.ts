import { StyleSheet } from "react-native";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useStyle = () => {
    const theme = useContext(ThemeContext).theme;
    return StyleSheet.create({
        root: {
            borderBottomStartRadius: getResponsiveSize(25),
            borderBottomEndRadius: getResponsiveSize(25),
            borderColor: theme.App.layoutBackground,
        },
        container: {
            alignItems: "center",
            flexDirection: "row",
            marginVertical: getResponsiveSize(15),
        },
        profileImageContainer: {
            position: "relative",
            marginRight: getResponsiveSize(15),
        },
        profileImage: {
            height: getResponsiveSize(60),
            width: getResponsiveSize(60),
            borderRadius: getResponsiveSize(30),
        },
        textContainer: {
            flex: 1,
            justifyContent: "center",
        },
        displayText: {
            color: theme.App.primaryText,
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
        },
        statusText: {
            color: theme.App.secondaryText,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
        },
        onlineDot: {
            left: "60%",
            top: "60%",
            position: "absolute",
            width: getResponsiveSize(25),
            height: getResponsiveSize(25),
            borderRadius: getResponsiveSize(12.5),
            backgroundColor: theme.App.profileIsOnlineDot,
        },
    });
};

export default useStyle;
