import { StyleSheet } from "react-native";
import { fontsizes, getLineHeight } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useStyle = () => {
    const theme = useContext(ThemeContext).theme;
    return StyleSheet.create({
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.App.primaryText,
        },
        textInput: {
            color: theme.App.secondaryText,
            borderWidth: 0,
            fontSize: fontsizes.medium,
            lineHeight: getLineHeight(fontsizes.medium),
            flex: 1,
            marginVertical: 10,
        },
    });
}

export default useStyle;
