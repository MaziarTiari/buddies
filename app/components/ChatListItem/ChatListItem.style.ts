import { StyleSheet } from "react-native";
import { fontsizes, getLineHeight } from "../../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const useChatListItemStyle = () => {
    const theme = useContext(ThemeContext).theme;
    return StyleSheet.create({
        rightContainer: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            alignSelf: "stretch",
        },
        lastMessageText: {
            fontSize: fontsizes.small,
            color: theme.App.secondaryText,
            lineHeight: getLineHeight(fontsizes.small),
        },
        unreadContainer: {
            height: fontsizes.small * 1.5, // scaling medium font for the dot container
            justifyContent: "center",
            alignItems: "center",
        },
        unreadDot: {
            width: fontsizes.small * 1.5, // scaling medium font for the dot
            height: fontsizes.small * 1.5,
            borderRadius: fontsizes.small * 0.75,
            backgroundColor: theme.App.primaryItem,
            justifyContent: "center",
            alignItems: "center",
        },
        unreadDotText: {
            color: theme.App.screenBackground,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
        },
    });
};

export default useChatListItemStyle;
