import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileAbout from "../ProfileAbout/ProfileAbout";
import ProfileActivity from "../ProfileActivity/ProfileActivity";
import ProfileGalery from "../ProfileGalery/ProfileGalery";
import { useNavOption, RouteName } from "../../navigation/Navigation.config";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => {
    const tabBarOptions = useNavOption().tabBar;
    const translations = useContext(LanguageContext).translations

    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name={RouteName.Profile.About}
                component={ProfileAbout}
                options={{ tabBarLabel: translations.profile_tab_about }}
            />
            <Tab.Screen
                name={RouteName.Profile.Activity}
                component={ProfileActivity}
                options={{ tabBarLabel: translations.profile_tab_activity }}
            />
            <Tab.Screen
                name={RouteName.Profile.Galery}
                component={ProfileGalery}
                options={{ tabBarLabel: translations.profile_tab_galery }}
            />
        </Tab.Navigator>
    );
}

export default ProfileTab;
