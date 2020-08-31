import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";

export default function useInputFieldContainerStyle() {
    const { theme } = useContext(ThemeContext);

    return StyleSheet.create({
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.App.inputBackground,
            flex: 1,
            borderRadius: getResponsiveSize(8),
            paddingHorizontal: getResponsiveSize(10),
        },
    });
}
