import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { StyleSheet } from "react-native";
import { getResponsiveSize, fontsizes } from "../../utils/font/font";

const useStyles = () => {
    const theme = useContext(ThemeContext).theme;
    return StyleSheet.create({
        root: {
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            alignContent:"center"
        },
        contentContainer: {
            marginHorizontal: getResponsiveSize(30),
            paddingVertical: getResponsiveSize(30),
        },
        heading: {
            color: theme.App.primaryText,
            fontWeight:"700",
            marginBottom: getResponsiveSize(20),
        },
        submitButton: {
            marginVertical: getResponsiveSize(20),
            width: "90%",
            alignSelf: "center"
        }
    });
}

export default useStyles;