import React from 'react';
import ActivityList from '../../ActivityList/ActivityList';
import translate from '../../../utils/language/translate';
import ActivityMap from '../../ActivityMap/ActivityMap';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigationComponentNames } from '../componentNames';
import { tabBarOptions } from '../navigationStyles';

const Tab = createMaterialTopTabNavigator();

export const ActivitiesTab = () => (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
            name={navigationComponentNames.ActivityList}
            component={ActivityList}
            options={{ tabBarLabel: translate("activities_tab_list") }}
        />
        <Tab.Screen
            name={navigationComponentNames.ActivityMap}
            component={ActivityMap}
            options={{ tabBarLabel: translate("activities_tab_map") }}
        />
    </Tab.Navigator>
)