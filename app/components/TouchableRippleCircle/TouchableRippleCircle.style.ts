import { StyleSheet } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";

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
        padding: getResponsiveSize(5)
    },
});

export default style;
