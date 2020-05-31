import React, { useContext } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { RouteName } from "../../navigation/Navigation.config";
import { useNavigation, useRoute } from '@react-navigation/native';


const ProfileHeader = () => {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const route = useRoute();
    return (
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
                <MenuOption
                    onSelect={() => {
                        navigation.navigate(RouteName.Profile.About, {onEdit: true})
                        navigation.navigate(RouteName.Profile.Activity)
                    }}
                    text="edit"
                />
                <MenuOption onSelect={() => {}} text="Option 2" />
                <MenuOption onSelect={() => {}} text="Option 3" />
                <MenuOption onSelect={() => {}} text="Option 4" />
            </MenuOptions>
        </Menu>
    );
};

export default ProfileHeader;
