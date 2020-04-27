import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";

const styles = StyleSheet.create({
    rightContainer: {
        margin: 15,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    lastMessageText: {
        fontSize: 14,
        color: Color.secondaryText,
    },
    unreadContainer: {
        height: 28,
        justifyContent: "center",
        alignItems: "center",
    },
    unreadDot: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Color.primaryText,
        justifyContent: "center",
        alignItems: "center",
    },
    unreadDotText: {
        color: Color.screenBackground,
        fontSize: 16,
    },
});

export default styles;
