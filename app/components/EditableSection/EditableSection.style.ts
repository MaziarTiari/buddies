import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { getResponsiveHeight } from "../../utils/font/font";

export default function useEditableSectionStyle(noDevider: boolean) {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            borderTopWidth: noDevider ? 0 : 0.5,
            borderTopColor: theme.App.devider,
            paddingTop: getResponsiveHeight(10),
            marginBottom: getResponsiveHeight(10),
            position: "relative"
        }, editIcon: {
            alignSelf: "flex-end",
            flex: 1,
            position: "absolute",
            margin: 0,
        }
    });
    return {
        styles: styles,
        theme: theme
    }
}
