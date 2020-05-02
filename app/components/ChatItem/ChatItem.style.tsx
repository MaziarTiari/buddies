import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import { fontsizes } from "../../utils/theme/font";
import { Device } from "../../utils/class/Device";

const device = new Device();
const roundMessageBorderRadius = device.width * 0.065;


const styles = StyleSheet.create({
    messageContainer: {
        borderTopRightRadius: roundMessageBorderRadius,
        borderTopLeftRadius: roundMessageBorderRadius,
        padding: fontsizes.small,
        margin: device.width * 0.016,
        minWidth: device.width * 0.2,
    },
    messageContainerSelf: {
        backgroundColor: Color.ChatItem.sentMsgBackground,
        borderBottomLeftRadius: roundMessageBorderRadius,
        alignSelf: "flex-end",
        marginLeft: "10%",
    },
    messageContainerOther: {
        backgroundColor: Color.ChatItem.recievedMsgBackground,
        borderBottomRightRadius: roundMessageBorderRadius,
        alignSelf: "flex-start",
        marginRight: "10%",
    },
    nameText: {
        fontSize: fontsizes.medium,
        fontWeight: "bold",
        color: Color.Theme.primaryText,
    },
    messageText: {
        fontSize: fontsizes.medium,
        color: Color.Theme.primaryText,
    },
    dateText: {
        fontSize: fontsizes.small,
        marginTop: fontsizes.small * 0.3,
        textAlign: "right",
        color: Color.Theme.basicItem,
    },
});

export default styles;
