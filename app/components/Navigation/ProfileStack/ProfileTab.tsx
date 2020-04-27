import React from 'react';
import UserProfile 
    from "../../UserProfile/UserProfile";
import UserActivityContainer 
    from "../../UserActivityContainer/UserActivityContainer";
import UserFotoGalery from "../../UserFotoGalery/UserFotoGalery";
import translate from "../../../utils/language/translate";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigationComponentNames } from '../componentNames';
import { tabBarOptions } from '../navigationStyles';

const Tab = createMaterialTopTabNavigator();

export const ProfileTab = () => (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
            name={navigationComponentNames.ProfileContainer}
            component={UserProfile}
            options={{ tabBarLabel: translate("profile_tab_about") }}
        />
        <Tab.Screen
            name={navigationComponentNames.ProfileActivityContainer}
            component={UserActivityContainer}
            options={{ tabBarLabel: translate("profile_tab_activity") }}
        />
        <Tab.Screen
            name={navigationComponentNames.ProfileFotoGalery}
            component={UserFotoGalery}
            options={{ tabBarLabel: translate("profile_tab_galery") }}
        />
    </Tab.Navigator>    
);
