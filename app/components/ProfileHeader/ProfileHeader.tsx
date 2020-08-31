import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import { fontsizes, getResponsiveSize } from "../../utils/font/font";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { transform, transformFileAsync } from "@babel/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

export const LeftProfileHeader = () => {
    const { theme } = useContext(ThemeContext);
    const { userIsEditingProfile, cancelEditingProfile } = useContext(SessionContext);

    return userIsEditingProfile
        ? <IconButton
            icon="close"
            size={getResponsiveSize(35)}
            color={theme.App.rejectColor}
            onPress={cancelEditingProfile}
        />
        : <View />
};

export const RightProfileHeader = () => {
    const { translations } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation();
    const {
        user,
        userProfile,
        userIsEditingProfile,
        startEditingProfile,
        saveEditingProfile,
        logout
    } = useContext(SessionContext);

    const isOwnProfile = user.id === userProfile.userId;

    return (
        <View style={{ flexDirection: "row", marginRight: 5}}>
            {isOwnProfile && !userIsEditingProfile &&
                <IconButton
                    icon="lead-pencil"
                    color={theme.App.interactiveItem}
                    onPress={startEditingProfile}
                />
            }
            {isOwnProfile && userIsEditingProfile &&
                <IconButton
                    icon="check"
                    size={getResponsiveSize(35)}
                    color={theme.App.acceptColor}
                    onPress={saveEditingProfile}
                />
            }
            {isOwnProfile && !userIsEditingProfile &&
                <Menu 
                    style={{
                        justifyContent: "center", 
                        alignItems: "center", 
                        marginRight: 5}}
                >
                    <MenuTrigger>
                        <MaterialCommunityIcons
                            color={theme.App.interactiveItem}
                            name="dots-horizontal-circle-outline"
                            size={getResponsiveSize(30)}
                            style={{padding: getResponsiveSize(5)}}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsWrapper: {
                                backgroundColor: theme.App.screenBackground,
                            },
                            optionWrapper: {
                                padding: getResponsiveSize(12),
                                shadowColor: "#0000",
                                shadowOffset: {
                                    width: 5,
                                    height: 5
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 3.84,
                                elevation: 20
                            },
                            optionText: {
                                fontSize: fontsizes.small,
                                color: theme.App.primaryText,
                            },
                        }}
                    >
                        <MenuOption 
                            onSelect={() => navigation.navigate(RouteName.Settings)} 
                            text={translations.settings} 
                        />
                        <MenuOption 
                            onSelect={logout} 
                            text={translations.logout} 
                        />
                    </MenuOptions>
                </Menu>
            }
        </View>
    );
};
