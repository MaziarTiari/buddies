import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import translate from "../../utils/language/translate";
import ActivityListScreen from "./ActivityListScreen";
import ActivityMapScreen from "./ActivityMapScreen";
import Color from "../../utils/theme/color";

const TabNavigator = createMaterialTopTabNavigator();

const ActivitiesTab = () => {
    return (
        <TabNavigator.Navigator
            tabBarOptions={{
                activeTintColor: Color.primaryText,
                inactiveTintColor: Color.secondaryText,
                style: { backgroundColor: Color.navBackground },
                indicatorStyle: { backgroundColor: Color.primaryText },
            }}
        >
            <TabNavigator.Screen
                name="ActivityList"
                component={ActivityListScreen}
                options={{ tabBarLabel: translate("activities_tab_list") }}
            />
            <TabNavigator.Screen
                name="ActivityMap"
                component={ActivityMapScreen}
                options={{ tabBarLabel: translate("activities_tab_map") }}
            />
        </TabNavigator.Navigator>
    );
};

export default ActivitiesTab;
