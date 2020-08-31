import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { fontsizes, getResponsiveSize, getLineHeight } from "../../utils/font/font";

const useProfileAboutStyle = () => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        galleryContainer: {
            flex: 1,
            aspectRatio: 1 // sets the height equal to width
        },
        primaryInfoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: getResponsiveSize(15),
            marginBottom: getResponsiveSize(15),
            justifyContent: 'space-between',
            flex: 1
        },
        innerInfoContainer: {
            alignItems: 'flex-start',
            flex: 7
        },
        userFriendsContainer: {
            flexDirection: 'row-reverse',
            alignItems: 'flex-end',
            alignSelf: 'flex-start',
            flex: 5
        },
        innerRippleContainer: {
            alignItems: 'center'
        },
        headline: {
            fontSize: fontsizes.medium,
            fontWeight: 'bold',
            color: theme.App.primaryText,
            lineHeight: getLineHeight(fontsizes.medium),
            marginBottom: getResponsiveSize(5)
        },
        linkHeadline: {
            fontSize: fontsizes.medium,
            fontWeight: 'bold',
            color: theme.App.secondaryInteractiveItem,
            lineHeight: getLineHeight(fontsizes.medium)
        },
        linkText: {
            fontSize: fontsizes.small,
            color: theme.App.secondaryInteractiveItem,
            lineHeight: getLineHeight(fontsizes.small)
        },
        text: {
            fontSize: fontsizes.small,
            color: theme.App.secondaryText
        },
        jobPlace: {
            fontStyle: 'italic',
            fontSize: fontsizes.xsmall
        },
        secondaryInfoContainer: {
            flex: 1,
            padding: getResponsiveSize(15),
            borderTopWidth: 2,
            borderTopStartRadius: getResponsiveSize(25),
            borderTopEndRadius: getResponsiveSize(25),
            borderColor: theme.App.layoutBackground
        },
        smallHeadline: {
            fontSize: fontsizes.small,
            color: theme.App.primaryText,
            lineHeight: getLineHeight(fontsizes.small)
        },
        columnContainer: {
            flexDirection: 'row'
        },
        column: {
            flex: 1
        },
        image: {
            flex: 1,
            resizeMode: 'contain',
            backgroundColor: 'black',
            width: '100%',
        }
    });

    return {
        styles: styles,
        theme: theme
    }
};

export default useProfileAboutStyle;
