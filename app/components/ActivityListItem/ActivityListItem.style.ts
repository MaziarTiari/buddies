import { StyleSheet } from "react-native";
import { Device } from "../../utils/class/Device";
import Color from "../../utils/theme/color";
import { fontsizes, getResponsiveSize } from "../../utils/theme/font";

const device = new Device();

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: Color.Theme.secondaryText,
        paddingTop: getResponsiveSize(20),
    },
    header: {
        flexDirection:"row", 
        justifyContent:"space-between",
        alignItems:"center",
    },
    iconText: {
        color: Color.Theme.basicItem,
        fontSize: fontsizes.medium,
    },
    container: {
        flexDirection: "row",
    },
    image: {
        width: device.width * 0.30,
        height: device.width * 0.30,
        maxHeight: 250,
        maxWidth: 250,
        alignSelf:"center",
        borderRadius: device.width * 0.07,
    },
    inforContainer: {
        width: device.width * 0.6,
        paddingHorizontal: fontsizes.small,
        justifyContent:"space-evenly",
    },
    title: {
        color: Color.Theme.primaryText,
        fontSize: fontsizes.medium,
        fontWeight: '700',
        lineHeight: fontsizes.medium + 3,
    },
    info: {
        color: Color.Theme.primaryText,
        fontSize: fontsizes.small,
        lineHeight: fontsizes.small + 5
    },
    iconContainer: {
        flexDirection:"row",
        justifyContent:"space-between", 
        alignSelf:"stretch", 
    },
    icon: {
        margin:0,    
        alignSelf:"flex-end",
    },
    bottomRightIcon: {
        alignSelf:"flex-end",
        bottom: getResponsiveSize(10),
    }
});