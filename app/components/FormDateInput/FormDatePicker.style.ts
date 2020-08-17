import { StyleSheet, Platform } from "react-native";

export const style = StyleSheet.create({
    container: {
        backgroundColor: Platform.select({ ios: "#fff" }),
        borderRadius: Platform.select({ ios: 8 })
    },
    buttonContainer: {
        flexDirection: "row",
        alignSelf: "flex-end",
        marginRight: 20
    }
});