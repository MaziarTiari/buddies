import { StyleSheet } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    return StyleSheet.create({
        list: {
            width: "100%",
        },
        imageContainer: {
            flex: 1,
            margin: getResponsiveSize(2),
        },
        image: {
            backgroundColor: "black", aspectRatio: 1, resizeMode: "contain"
        }
    });
};

export default useStyle;