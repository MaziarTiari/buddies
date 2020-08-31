import { StyleSheet } from "react-native";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useChatInputStyle = () => {
    const theme = useContext(ThemeContext).theme;
    const styles = StyleSheet.create({
        inputContainer: {
            borderColor: theme.App.inputBorderColor,
            borderWidth: 1,
            borderRadius: getResponsiveSize(30),
        },
    });
    return { theme: theme, styles: styles };
};

export default useChatInputStyle;
