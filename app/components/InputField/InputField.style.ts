import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        backgroundColor: Color.navBackground,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 30,
        margin: 5,
    },
    textInput: {
        color: Color.secondaryText,
        borderWidth: 0,
        fontSize: 16,
        flex: 1,
        marginVertical: 10,
    },
});

export default styles;
