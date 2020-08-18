import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { useNavigation } from '@react-navigation/native';
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { View } from "react-native";


const ProfileHeader = () => {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const {
        user,
        userProfile,
        userIsEditingProfile,
        startEditingProfile,
        cancelEditingProfile,
        saveEditingProfile
    } = useContext(SessionContext);

    const isOwnProfile = user.id === userProfile.userId;

    return (
        <View style={{ flexDirection: "row" }}>
            {isOwnProfile && !userIsEditingProfile &&
                <IconButton
                    icon="lead-pencil"
                    color={theme.App.basicItem}
                    onPress={startEditingProfile}
                />
            }
            {isOwnProfile && userIsEditingProfile &&
                <React.Fragment>
                    <IconButton
                        icon="close"
                        color={theme.App.basicItem}
                        onPress={cancelEditingProfile}
                    />
                    <IconButton
                        icon="check"
                        color={theme.App.basicItem}
                        onPress={saveEditingProfile}
                    />
                </React.Fragment>
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

export default ProfileHeader;
