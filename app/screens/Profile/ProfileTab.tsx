import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AboutScreen from "./AboutScreen";
import ActivityScreen from "./ActivityScreen";
import GaleryScreen from "./GaleryScreen";
import translate from "../../utils/language/translate";

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{ tabBarLabel: translate("profile_tab_about") }}
            />
            <Tab.Screen
                name="Activity"
                component={ActivityScreen}
                options={{ tabBarLabel: translate("profile_tab_activity") }}
            />
            <Tab.Screen
                name="Galery"
                component={GaleryScreen}
                options={{ tabBarLabel: translate("profile_tab_galery") }}
            />
        </Tab.Navigator>
    );
};

export default ProfileTab;
