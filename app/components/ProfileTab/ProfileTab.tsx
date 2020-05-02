import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileAbout from "../ProfileAbout/ProfileAbout";
import ProfileActivity from "../ProfileActivity/ProfileActivity";
import ProfileGalery from "../ProfileGalery/ProfileGalery";
import translate from "../../utils/function/language/translate";
import { tabBarOptions, RouteName } from "../../utils/function/navigation/configuration";

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
            name={RouteName.Profile.About}
            component={ProfileAbout}
            options={{ tabBarLabel: translate("profile_tab_about") }}
        />
        <Tab.Screen
            name={RouteName.Profile.Activity}
            component={ProfileActivity}
            options={{ tabBarLabel: translate("profile_tab_activity") }}
        />
        <Tab.Screen
            name={RouteName.Profile.Galery}
            component={ProfileGalery}
            options={{ tabBarLabel: translate("profile_tab_galery") }}
        />
    </Tab.Navigator>
);

export default ProfileTab;
