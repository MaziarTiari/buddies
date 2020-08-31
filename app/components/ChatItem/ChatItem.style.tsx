import { StyleSheet } from "react-native";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const roundMessageBorderRadius = getResponsiveSize(25);

const useChatItemStyle = () => {
    const theme = useContext(ThemeContext).theme;

    return StyleSheet.create({
        messageContainer: {
            borderTopRightRadius: roundMessageBorderRadius,
            borderTopLeftRadius: roundMessageBorderRadius,
            padding: getResponsiveSize(15),
            margin: getResponsiveSize(5),
            minWidth: getResponsiveSize(150),
        },
        messageContainerSelf: {
            backgroundColor: theme.ChatItem.sentMsgBackground,
            borderBottomLeftRadius: roundMessageBorderRadius,
            alignSelf: "flex-end",
            marginLeft: "10%",
        },
        messageContainerOther: {
            backgroundColor: theme.ChatItem.recievedMsgBackground,
            borderBottomRightRadius: roundMessageBorderRadius,
            alignSelf: "flex-start",
            marginRight: "10%",
        },
        nameText: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            fontWeight: "bold",
            color: theme.App.primaryText,
        },
        messageText: {
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.primaryText,
        },
        dateText: {
            fontSize: fontsizes.xsmall,
            marginTop: getResponsiveSize(5),
            textAlign: "right",
            color: theme.App.secondaryText,
        },
    });
};

export default useChatItemStyle;
