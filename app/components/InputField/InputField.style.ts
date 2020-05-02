import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import { fontsizes } from "../../utils/theme/font";

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Color.Theme.primaryText,
        borderRadius: fontsizes.xsmall,
    },
    textInput: {
        color: Color.Theme.secondaryText,
        borderWidth: 0,
        fontSize: fontsizes.medium,
        flex: 1,
        marginVertical: 10,
    },
});

export default styles;
