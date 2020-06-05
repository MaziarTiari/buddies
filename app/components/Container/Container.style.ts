import { StyleSheet, Platform } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";


export const useStyle = () => {
    const theme = useContext(ThemeContext).theme;

    const screen = StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: theme.App.screenBackground,
            alignItems: "center",
        },
        body: {
            flex: 1,
            alignItems: "stretch",
            alignSelf: "stretch",
        },
    });

    const component = StyleSheet.create({
        root: {
            flex: 1,
            alignItems: "stretch",
            alignSelf: "stretch",
            marginHorizontal: getResponsiveSize(15),
        },
        root_center: {
            flex: 1,
            alignSelf: "stretch",
            marginHorizontal: getResponsiveSize(15),
            alignItems: "center",
            paddingTop: 30,
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
        },
    });

    const styles = { screen: screen, component: component };

    return styles
}

