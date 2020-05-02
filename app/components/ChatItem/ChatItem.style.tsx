import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";

const styles = StyleSheet.create({
    messageContainer: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        margin: 5,
        minWidth: "20%",
        maxWidth: "80%",
    },
    messageContainerSelf: {
        backgroundColor: "green", // TODO CHANGE
        borderBottomLeftRadius: 20,
        alignSelf: "flex-end",
    },
    messageContainerOther: {
        backgroundColor: "#444", // TODO CHANGE
        borderBottomRightRadius: 20,
        alignSelf: "flex-start",
    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold",
        color: Color.primaryText,
    },
    messageText: {
        fontSize: 16,
        color: Color.primaryText,
    },
    dateText: {
        fontSize: 12,
        marginTop: 5,
        textAlign: "right",
        color: Color.secondaryText,
    },
});

export default styles;
