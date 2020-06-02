import React, { useContext, useState } from "react";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Menu, MenuTrigger, MenuOption, MenuOptions, MenuOptionCustomStyle } from "react-native-popup-menu";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { StyleProp, ViewStyle, View } from "react-native";

interface ProfileAboutMenuProps {
    onEdit: (state: boolean) => void;
    isOnEdit: boolean;
    style?: StyleProp<ViewStyle>;
}
const ProfileAboutMenu = ( Props: ProfileAboutMenuProps) => {
    const { theme } = useContext(ThemeContext);

    const changeEdit = (state: boolean) => {
        Props.onEdit(!state);
    }

    return (
        <Menu style={Props.style}>
            <MenuTrigger>
                <IconButton 
                    icon="dots-horizontal" color="#FFF" size={23} 
                    style={{backgroundColor:"#222"}}
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
                    onSelect={() => Props.onEdit(!Props.isOnEdit)}  
                    text={Props.isOnEdit ? "done" : "edit profile"}/>
                { !Props.isOnEdit &&
                <View>
                    <MenuOption onSelect={() => {}} text="Option 2" />
                    <MenuOption onSelect={() => {}} text="Option 3" />
                    <MenuOption onSelect={() => {}} text="Option 4" />
                </View>
                }
            </MenuOptions>
        </Menu>
    )
}

export default ProfileAboutMenu
