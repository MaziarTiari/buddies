import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";

export const LeftProfileHeader = () => {
    const { theme } = useContext(ThemeContext);
    const { userIsEditingProfile, cancelEditingProfile, } = useContext(SessionContext);

    return userIsEditingProfile
        ? <IconButton
            icon="close"
            color={theme.App.basicItem}
            onPress={cancelEditingProfile}
        />
        : <View />
};

export const RightProfileHeader = () => {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation();
    const {
        user,
        userProfile,
        userIsEditingProfile,
        startEditingProfile,
        saveEditingProfile
    } = useContext(SessionContext);

    const isOwnProfile = user.id === userProfile.userId;

    return (
        <View style={{ flexDirection: "row" }}>
            {isOwnProfile && !userIsEditingProfile &&
                <React.Fragment>
                    <IconButton
                        icon="lead-pencil"
                        color={theme.App.basicItem}
                        onPress={startEditingProfile}
                    />
                    <IconButton
                        icon="cogs"
                        color={theme.App.basicItem}
                        onPress={() => navigation.navigate(RouteName.Settings)}
                    />
                </React.Fragment>
            }
            {isOwnProfile && userIsEditingProfile &&
                <IconButton
                    icon="check"
                    color={theme.App.basicItem}
                    onPress={saveEditingProfile}
                />
            }
            {!isOwnProfile &&
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
