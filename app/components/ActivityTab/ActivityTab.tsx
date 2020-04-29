import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActivityList from "../ActivityList/ActivityList";
import ActivityMap from "../ActivityMap/ActivityMap";
import translate from "../../utils/language/translate";
import { tabBarOptions, RouteName } from "../../utils/navigation/configuration";

const Tab = createMaterialTopTabNavigator();

const ActivitiesTab = () => (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
            name={RouteName.Activity.List}
            component={ActivityList}
            options={{ tabBarLabel: translate("activities_tab_list") }}
        />
        <Tab.Screen
            name={RouteName.Activity.Map}
            component={ActivityMap}
            options={{ tabBarLabel: translate("activities_tab_map") }}
        />
    </Tab.Navigator>
);

export default ActivitiesTab;
