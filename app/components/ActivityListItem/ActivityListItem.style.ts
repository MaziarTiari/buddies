import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import { fontsizes, getResponsiveSize, lineheights } from "../../utils/theme/font";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: Color.Theme.layoutBackground,
        borderBottomStartRadius: getResponsiveSize(25),
        borderBottomEndRadius: getResponsiveSize(25),
        paddingTop: getResponsiveSize(10),
        paddingBottom: getResponsiveSize(25),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconText: {
        color: Color.Theme.basicItem,
        fontSize: fontsizes.medium,
        lineHeight: lineheights.medium,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: getResponsiveSize(150),
        height: getResponsiveSize(150),
        alignSelf: "center",
        borderRadius: getResponsiveSize(25),
    },
    inforContainer: {
        flex: 1,
        marginLeft: getResponsiveSize(15),
        justifyContent: "space-between",
    },
    title: {
        color: Color.Theme.primaryText,
        fontSize: fontsizes.medium,
        fontWeight: "bold",
        lineHeight: lineheights.medium,
    },
    info: {
        color: Color.Theme.primaryText,
        fontSize: fontsizes.small,
        lineHeight: lineheights.small,
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
});
