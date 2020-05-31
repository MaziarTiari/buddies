import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
    });
}

export default useStyle;