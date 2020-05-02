import { StyleSheet } from "react-native";
import { Device } from "../../utils/class/Device";
import Color from "../../utils/theme/color";
import { fontsizes } from "../../utils/theme/font";

const device = new Device();

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: fontsizes.large,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: Color.Theme.secondaryText,
    },
    header: {
        flexDirection:"row", 
        justifyContent:"space-between",
        alignItems:"center",
    },
    ownerName: {
        fontSize:fontsizes.medium, 
        color:Color.Theme.basicItem, 
    },
    container: {
        flexDirection: "row",
    },
    image: {
        width: device.width * 0.30,
        height: device.width * 0.30,
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
        bottom: 10,
    }
});