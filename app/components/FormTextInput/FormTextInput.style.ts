import React, { useContext } from "react";
import { StyleSheet, Platform } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            paddingVertical: Platform.OS === 'ios'
                ? getResponsiveSize(15)
                : getResponsiveSize(10),
            borderWidth: 1,
            marginVertical: getResponsiveSize(5),
            paddingHorizontal: getResponsiveSize(10)
        },
        input: {
            color: theme.App.primaryText,
        }
    });
};

export default useStyle;