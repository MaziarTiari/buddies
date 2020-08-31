import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { useNavigation } from '@react-navigation/native';
import { SessionContext } from "../../context/SessionContext/SessionContext";
import useAppNavigation from "../../hooks/useAppNavigation";

export const LeftActivityHeader = () => {
    const { navigation } = useAppNavigation();
    const { theme } = useContext(ThemeContext);
    const {
        userIsEditingActivity,
        cancelEditingActivity,
        activity
    } = useContext(SessionContext);

    const handleCancelPressed = () => {
        cancelEditingActivity();
        if (activity.id === "") {
            navigation.goBack();
        }
    }

    return userIsEditingActivity
        ? <IconButton
            icon="close"
            color={theme.App.rejectColor}
            onPress={handleCancelPressed}
        />
        : <IconButton
            icon="arrow-left"
            color={theme.App.basicItem}
            onPress={navigation.goBack}
        />
}

export const RightActivityHeader = () => {
    const { theme } = useContext(ThemeContext);
    const {
        user,
        activity,
        userIsEditingActivity,
        startEditingActivity,
        saveEditingActivity,
    } = useContext(SessionContext);

    const isOwnActivity = user.id === activity.userId;

    return (
        <React.Fragment>
            {isOwnActivity && !userIsEditingActivity &&
                <IconButton
                    icon="lead-pencil"
                    color={theme.App.interactiveItem}
                    onPress={startEditingActivity}
                />
            }
            {isOwnActivity && userIsEditingActivity &&
                <IconButton
                    icon="check"
                    color={theme.App.acceptColor}
                    onPress={saveEditingActivity}
                />
            }
            {!isOwnActivity &&
                null
                // <Menu>
                //     <MenuTrigger>
                //         <IconButton
                //             color={theme.App.basicItem}
                //             icon="dots-vertical-circle-outline"
                //         />
                //     </MenuTrigger>
                //     <MenuOptions
                //         customStyles={{
                //             optionsWrapper: {
                //                 backgroundColor: theme.App.menuBackground,
                //             },
                //             optionWrapper: {
                //                 padding: getResponsiveSize(12),
                //             },
                //             optionText: {
                //                 fontSize: fontsizes.small,
                //                 color: theme.App.primaryText,
                //             },
                //         }}
                //     >
                //         <MenuOption onSelect={() => { }} text="Option 1" />
                //         <MenuOption onSelect={() => { }} text="Option 2" />
                //         <MenuOption onSelect={() => { }} text="Option 3" />
                //         <MenuOption onSelect={() => { }} text="Option 4" />
                //     </MenuOptions>
                // </Menu>
            }
        </React.Fragment>
    );
};
