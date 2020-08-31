import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { CustomModalProps } from './CustomModal';
import { getResponsiveSize } from "../../utils/font/font";

export const useCustomModalStyle = (props: CustomModalProps) => {
    const { theme } = useContext(ThemeContext);

    return StyleSheet.create({
        root: {
            backgroundColor: theme.App.darkenBackground,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        container: {
            flex: props.fixPosition ? 0 : 1,
            justifyContent: props.fixPosition ? "flex-start" : "center",
            alignItems: "stretch",
            top: props.fixPosition ? "15%" : 0,
        },
        modalView: {
            paddingBottom: getResponsiveSize(20),
            position:"absolute",
            width:"90%",
            alignSelf:"center",
            alignItems:"stretch",
            backgroundColor: theme.App.screenBackground,
            borderRadius: 20,
            paddingHorizontal: getResponsiveSize(20),
            shadowColor: "#0000",
            shadowOffset: {
                width: 5,
                height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 20
        },
        header: {
            justifyContent: "space-between",
            flexDirection: "row",
        },
        closeIcon: {
            alignSelf: props.onSubmit ? "flex-start" : "flex-end",
        },
        submitIcon: {
            alignSelf: "flex-end",
        }
    });
}