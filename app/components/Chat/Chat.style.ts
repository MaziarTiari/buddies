import { StyleSheet, Platform } from "react-native";
import { getResponsiveHeight } from "../../utils/font/font";

const styles = StyleSheet.create({
    container: {
        paddingBottom: Platform.OS === "ios" ? 20 : 10,
    },
    inputField: {
        alignSelf: "flex-end",
    },
    list: {
        flex: 1,
        marginBottom: getResponsiveHeight(7)
    },
});

export default styles;
