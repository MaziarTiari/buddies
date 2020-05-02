import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import { Device } from "../../utils/class/Device";
import { fontsizes } from "../../utils/theme/font";

const device = new Device();

const imageSize = device.width * 0.15;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomStartRadius: device.width * 0.08,
        borderBottomEndRadius: device.width * 0.08,
        borderColor: Color.Theme.layoutBackground,
    },
    profileImageContainer: {
        position:"relative"
    },
    profileImage: {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize,
        margin: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    displayText: {
        color: Color.Theme.secondaryText,
        fontSize: fontsizes.medium + 2,
    },
    statusText: {
        color: Color.Theme.secondaryText,
        fontSize: fontsizes.small + 1,
    },
    onlineDot: {
        left: "60%",
        top: "60%",
        position: "absolute",
        width: imageSize * 0.35,
        height: imageSize * 0.35,
        borderRadius: imageSize * 0.35,
        backgroundColor: Color.Theme.profileIsOnlineDot,
    },
});

export default styles;
