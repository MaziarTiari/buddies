import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import translate from "../../utils/language/translate";
import ActivityListScreen from "./ActivityListScreen";
import ActivityMapScreen from "./ActivityMapScreen";

const TabNavigator = createMaterialTopTabNavigator();

const ActivitiesTab = () => {
    return (
        <TabNavigator.Navigator>
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
