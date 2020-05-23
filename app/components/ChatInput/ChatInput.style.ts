import { StyleSheet } from "react-native";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useStyle = () => {
    const theme = useContext(ThemeContext).theme;
    const styles = StyleSheet.create({
        inputContainer: {
            borderRadius: getResponsiveSize(30),
        },
    });
    return { theme: theme, styles: styles };
};

export default useStyle;
