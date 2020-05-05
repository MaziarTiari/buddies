import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import { Device } from "../../utils/class/Device";
import { fontsizes, getLineHeight } from "../../utils/theme/font";

const device = new Device();

const styles = StyleSheet.create({
    rightContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        alignSelf: "stretch",
    },
    lastMessageText: {
        fontSize: fontsizes.small,
        color: Color.Theme.secondaryText,
        lineHeight: getLineHeight(fontsizes.small),
    },
    unreadContainer: {
        height: fontsizes.medium * 1.5, // scaling medium font for the dot container
        justifyContent: "center",
        alignItems: "center",
    },
    unreadDot: {
        width: fontsizes.medium * 1.5, // scaling medium font for the dot
        height: fontsizes.medium * 1.5,
        borderRadius: fontsizes.medium * 0.75,
        backgroundColor: Color.Theme.primaryText,
        justifyContent: "center",
        alignItems: "center",
    },
    unreadDotText: {
        color: Color.Theme.screenBackground,
        fontSize: fontsizes.medium,
    },
});

export default styles;
