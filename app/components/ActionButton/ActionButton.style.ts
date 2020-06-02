import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        overlay: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "transparent",
            alignItems: "flex-end",
            justifyContent: "flex-end",
        },
        button: {
            backgroundColor: theme.App.primaryItem,
            width: getResponsiveSize(80),
            height: getResponsiveSize(80),
            borderRadius: getResponsiveSize(80),
            margin: getResponsiveSize(20),
        },
        text: {
            fontSize: getResponsiveSize(40),
            lineHeight: getResponsiveSize(1.15 * 40),
            color: theme.App.primaryText,
            fontWeight: "bold",
            textAlignVertical: "center",
            textAlign: "center",
        },
    });
};

export default useStyle;
