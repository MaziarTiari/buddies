import { StyleSheet, Platform, Dimensions } from "react-native";
import { getResponsiveHeight, getResponsiveSize } from "../../utils/font/font";

const styles = StyleSheet.create({
    root: {
        paddingBottom: Platform.OS === "ios" ? 20 : 10,
        display: "flex",
        alignContent: "stretch",
        alignItems: "stretch",
    },
    inputField: {
        alignSelf: "flex-end",
    },
    list: {
        flex: 1,
        marginBottom: getResponsiveHeight(7),
        paddingHorizontal: getResponsiveSize(10)
    },
});

export default styles;
