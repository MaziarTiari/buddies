import { StyleSheet } from "react-native";
import Color from "../../utils/theme/color";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/theme/font";

const roundMessageBorderRadius = getResponsiveSize(25);

const styles = StyleSheet.create({
    messageContainer: {
        borderTopRightRadius: roundMessageBorderRadius,
        borderTopLeftRadius: roundMessageBorderRadius,
        padding: getResponsiveSize(15),
        margin: getResponsiveSize(5),
        minWidth: getResponsiveSize(150),
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
        lineHeight: getLineHeight(fontsizes.medium),
        fontWeight: "bold",
        color: Color.Theme.primaryText,
    },
    messageText: {
        fontSize: fontsizes.medium,
        lineHeight: getLineHeight(fontsizes.medium),
        color: Color.Theme.primaryText,
    },
    dateText: {
        fontSize: fontsizes.small,
        marginTop: getResponsiveSize(5),
        textAlign: "right",
        color: Color.Theme.secondaryText,
    },
});

export default styles;
