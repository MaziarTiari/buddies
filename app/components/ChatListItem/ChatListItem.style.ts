import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import { Device } from "../../utils/class/Device";
import { fontsizes } from "../../utils/theme/font";

const device = new Device();

const styles = StyleSheet.create({
    rightContainer: {
        margin: device.width * 0.03,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    lastMessageText: {
        fontSize: fontsizes.small,
        color: Color.Theme.secondaryText,
    },
    unreadContainer: {
        height: fontsizes.large,
        justifyContent: "center",
        alignItems: "center",
    },
    unreadDot: {
        width: fontsizes.medium + 3,
        height: fontsizes.medium + 3,
        borderRadius: fontsizes.medium + 3,
        backgroundColor: Color.Theme.primaryText,
        justifyContent: "center",
        alignItems: "center",
    },
    unreadDotText: {
        color: Color.Theme.screenBackground,
        fontSize: fontsizes.small + 3,
    },
});

export default styles;
