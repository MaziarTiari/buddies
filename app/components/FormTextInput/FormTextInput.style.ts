import React, { useContext } from "react";
import { StyleSheet, Platform } from "react-native";
import { getResponsiveSize, getResponsiveHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Device } from "../../utils/device/Device";
const decive = new Device();
const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        container: {
            paddingVertical: Platform.OS === 'ios'
                ? getResponsiveHeight(15)
                : decive.height > 750 ? getResponsiveHeight(5) : 0,
            borderWidth: 1,
            marginVertical: getResponsiveHeight(5),
            paddingHorizontal: getResponsiveSize(10)
        },
        input: {
            color: theme.App.primaryText,
        }
    });
};

export default useStyle;