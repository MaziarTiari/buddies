import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { StyleSheet } from 'react-native';
import {
    fontsizes,
    getLineHeight,
    getResponsiveHeight,
    getResponsiveSize,
} from '../../utils/font/font';

const useStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        root: {
            flex: 1,
            alignSelf: 'stretch',
        },
        headline: {
            fontSize: fontsizes.medium,
            fontWeight: 'bold',
            color: theme.App.primaryText,
            lineHeight: getLineHeight(fontsizes.medium),
            marginBottom: getResponsiveHeight(5)
        },
        linkHeadline: {
            fontSize: fontsizes.medium,
            fontWeight: 'bold',
            color: theme.App.secondaryInteractiveItem,
            lineHeight: getLineHeight(fontsizes.medium)
        },
        iconLabel: {
            fontWeight: 'bold',
            color: theme.App.secondaryInteractiveItem,
            textAlignVertical: 'center',
            fontSize: getResponsiveSize(20),
            lineHeight: getResponsiveSize(20)
        },
        imageEditIconContainer: {
            backgroundColor: theme.App.screenBackground,
            borderRadius: 50,
            marginRight: getResponsiveSize(15),
            marginBottom: getResponsiveHeight(15)
        },
        linkText: {
            fontSize: fontsizes.small,
            color: theme.App.secondaryInteractiveItem,
            lineHeight: getLineHeight(fontsizes.small)
        },
        foreignMemberListContainer: {
            flexDirection: 'row',
            alignSelf: 'flex-start',
            padding: getResponsiveSize(5),
            borderRadius: 10000,
        },
        primaryInfoContainer: {
            flexDirection: 'row',
            alignSelf: 'flex-end',
            justifyContent: 'space-evenly'
        },
        innerInfoContainer: {
            flex: 1
        },
        innerRippleContainer: {
            alignItems: 'center'
        },
        text: {
            fontSize: fontsizes.small,
            color: theme.App.secondaryText,
            lineHeight: getLineHeight(fontsizes.small)
        },
        galleryContainer: {
            width: '100%',
            aspectRatio: 1 // sets the height equal to width
        },
        image: {
            width: '100%',
            flex: 1,
            resizeMode: 'contain',
            backgroundColor: 'black'
        },
        imageEditContainer: {
            position: 'absolute',
            bottom: 0,
            right: 0
        },
        imageEditIcon: {
            margin: 2
        },
        buttonContainer: {
            flexDirection: 'row'
        },
        button: {
            flex: 1,
            borderColor: theme.App.devider,
            borderWidth: 1,
            borderRadius: 0,
            backgroundColor: theme.App.menuBackground
        },
        activityUsersIconContainer: {
            flex: 1,
            position: 'absolute',
            top: 0,
            right: getResponsiveSize(10),
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.App.screenBackground,
            padding: getResponsiveSize(10),
            borderBottomLeftRadius: getResponsiveSize(40),
            borderBottomRightRadius: getResponsiveSize(40),
            shadowColor: "#0000",
            shadowOffset: {
                width: 5,
                height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 24
        },
        quickInfoContainer: {
            flexDirection: 'row',
            alignSelf: 'baseline'
        }
    });
};

export default useStyle;
