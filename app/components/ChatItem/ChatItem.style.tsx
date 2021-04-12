import { StyleSheet } from "react-native";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const roundMessageBorderRadius = getResponsiveSize(25);

const useChatItemStyle = (self: boolean) => {
    const theme = useContext(ThemeContext).theme;

    return StyleSheet.create({
        messageContainer: {
            borderTopRightRadius: roundMessageBorderRadius,
            borderTopLeftRadius: roundMessageBorderRadius,
            padding: getResponsiveSize(15),
            margin: getResponsiveSize(5),
            minWidth: getResponsiveSize(150),
            backgroundColor: self 
            ? theme.ChatItem.sentMsgBackground 
            : theme.ChatItem.recievedMsgBackground,
        },
        self: {
            marginLeft: "10%",
            borderBottomLeftRadius: roundMessageBorderRadius,
            alignSelf: "flex-end",
        },
        otherMember: {
            marginRight: "10%",
            borderBottomRightRadius: roundMessageBorderRadius,
            alignSelf: "flex-start",
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
            alignSelf: "flex-end",
            color: theme.App.secondaryText,
        },
    });
};

export default useChatItemStyle;
