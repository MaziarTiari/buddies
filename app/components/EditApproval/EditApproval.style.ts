import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useContext } from "react";
import { StyleSheet } from "react-native";

export const useEditApprovalStyle = () => {
    const { theme, themeType } = useContext(ThemeContext);

    return StyleSheet.create({
        container: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: theme.App.layoutBackground,
            borderTopWidth: themeType === 'light' ? 2.5 : 0,
            borderColor: '#ECECEC'
        }
    });
}