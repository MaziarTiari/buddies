import { StyleSheet } from "react-native";
import { fontsizes } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useStyle = () => {
    const theme = useContext(ThemeContext).theme;
    const styles = StyleSheet.create({
        inputContainer: {
            backgroundColor: theme.App.layoutBackground,
            borderRadius: fontsizes.icon,
        },
    });
    return {theme: theme, styles: styles}
}

export default useStyle;
