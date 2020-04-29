import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Color.screenBackground,
    },
    text: {
        color: Color.secondaryText,
    },
});
