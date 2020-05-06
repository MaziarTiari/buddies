import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActivityList from "../ActivityList/ActivityList";
import ActivityMap from "../ActivityMap/ActivityMap";
import { useNavOption, RouteName } from "../../navigation/Navigation.config";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const Tab = createMaterialTopTabNavigator();

const ActivitiesTab = () => {
    const tabBarOptions = useNavOption().tabBar;
    const translations = useContext(LanguageContext).translations;
    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name={RouteName.Activity.List}
                component={ActivityList}
                options={{ tabBarLabel: translations.activities_tab_list }}
            />
            <Tab.Screen
                name={RouteName.Activity.Map}
                component={ActivityMap}
                options={{ tabBarLabel: translations.activities_tab_map }}
            />
        </Tab.Navigator>
    );
}

export default ActivitiesTab;
