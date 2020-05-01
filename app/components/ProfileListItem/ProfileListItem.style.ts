import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        borderColor: Color.Theme.layoutBackground,
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        margin: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    displayText: {
        color: Color.Theme.secondaryText,
        fontSize: 20,
    },
    statusText: {
        color: Color.Theme.secondaryText,
        fontSize: 14,
    },
    onlineDot: {
        left: 45,
        top: 45,
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Color.Theme.profileIsOnlineDot,
    },
});

export default styles;
