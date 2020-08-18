import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { useNavigation } from '@react-navigation/native';
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { View } from "react-native";


const ActivityHeader = () => {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const {
        user,
        activity,
        userIsEditingActivity,
        startEditingActivity,
        saveEditingActivity,
        cancelEditingActivity
    } = useContext(SessionContext);

    const isOwnActivity = user.id === activity.userId;

    return (
        <View style={{ flexDirection: "row" }}>
            {isOwnActivity && !userIsEditingActivity &&
                <IconButton
                    icon="lead-pencil"
                    color={theme.App.basicItem}
                    onPress={startEditingActivity}
                />
            }
            {isOwnActivity && userIsEditingActivity &&
                <React.Fragment>
                    <IconButton
                        icon="close"
                        color={theme.App.basicItem}
                        onPress={cancelEditingActivity}
                    />
                    <IconButton
                        icon="check"
                        color={theme.App.basicItem}
                        onPress={saveEditingActivity}
                    />
                </React.Fragment>
            }
            {!isOwnActivity &&
                <Menu>
                    <MenuTrigger>
                        <IconButton
                            color={theme.App.basicItem}
                            icon="dots-vertical-circle-outline"
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsWrapper: {
                                backgroundColor: theme.App.menuBackground,
                            },
                            optionWrapper: {
                                padding: getResponsiveSize(12),
                            },
                            optionText: {
                                fontSize: fontsizes.small,
                                color: theme.App.primaryText,
                            },
                        }}
                    >
                        <MenuOption onSelect={() => { }} text="Option 1" />
                        <MenuOption onSelect={() => { }} text="Option 2" />
                        <MenuOption onSelect={() => { }} text="Option 3" />
                        <MenuOption onSelect={() => { }} text="Option 4" />
                    </MenuOptions>
                </Menu>
            }
        </View>
    );
};

export default ActivityHeader;
