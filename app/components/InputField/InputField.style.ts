import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Color.inputBackground,
        borderRadius: 4,
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
