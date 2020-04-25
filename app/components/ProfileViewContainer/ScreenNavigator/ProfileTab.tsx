import React from 'react';
import AboutScreen from "../ProfileInformation/ProfileInformation";
import ActivityScreen from "../ProfileActivityContainer/ProfileActivityContainer";
import GaleryScreen from "../FotoGalery/FotoGalery";
import translate from "../../../utils/language/translate";
import TabNavigator, { 
    TabNavigatorScreen } from "../../TabNavigator/TabNavigator";

const profileNavigationScreens: TabNavigatorScreen[] = [
    {
        name:"About",
        component: AboutScreen,
        tabBarLabel: translate("profile_tab_about")
    },
    {
        name:"Activity",
        component: ActivityScreen,
        tabBarLabel: translate("profile_tab_activity")
    },
    {
        name:"Galery",
        component: GaleryScreen,
        tabBarLabel: translate("profile_tab_galery")
    }
];

export const ProfileTab = () => <TabNavigator screens={profileNavigationScreens} />
