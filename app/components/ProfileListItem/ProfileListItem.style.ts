import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/theme/font";

const styles = StyleSheet.create({
    root: {
        borderBottomWidth: 1,
        borderBottomStartRadius: getResponsiveSize(25),
        borderBottomEndRadius: getResponsiveSize(25),
        borderColor: Color.Theme.layoutBackground,
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        marginVertical: getResponsiveSize(20),
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
        color: Color.Theme.primaryText,
        fontSize: fontsizes.medium,
        lineHeight: getLineHeight(fontsizes.medium),
    },
    statusText: {
        color: Color.Theme.secondaryText,
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
        backgroundColor: Color.Theme.profileIsOnlineDot,
    },
});

export default styles;
