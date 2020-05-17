import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    outerContainer: {
        borderRadius: 100000, // just a very high number to safly get a cirle
        overflow: "hidden",
        aspectRatio: 1,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});

export default style;
