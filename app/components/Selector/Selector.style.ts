import { StyleSheet, Dimensions } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { getResponsiveSize, fontsizes } from "../../utils/font/font";

const MAX_HEIGHT = Dimensions.get("screen").height * 0.4;

export const useStyle = (editable: boolean) => {
    const { theme } = useContext(ThemeContext);

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        selectorContainer: {
            flex: 1, alignSelf:"stretch"
        },
        autosuggestInputField: {
            backgroundColor: theme.App.menuBackground,
            borderWidth: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        dropDownListContainer: {
            maxHeight: MAX_HEIGHT,
            backgroundColor:theme.App.menuBackground,
            borderRadius: editable ? 0 : getResponsiveSize(10),
            borderBottomLeftRadius: getResponsiveSize(10),
            borderBottomRightRadius: getResponsiveSize(10),
            marginBottom: getResponsiveSize(20),
        },
        item: {
            paddingHorizontal: getResponsiveSize(15), 
            paddingVertical: getResponsiveSize(4),
        },
        itemText: {
            fontSize: fontsizes.small,
            color: theme.App.primaryText,
        },
        modalView: {
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
        modalIcon: {
            alignSelf:"flex-end",
        }
    });
}