import React from 'react';
import TabNavigator, { TabNavigatorScreen } from '../../TabNavigator/TabNavigator';
import ActivityListView from '../ListView/ListView';
import translate from '../../../utils/language/translate';
import ActivityMapView from '../MapView/MapView';

const AtivityTabScreens: TabNavigatorScreen[] = [
    {
        name: "ActivityList",
        component: ActivityListView,
        tabBarLabel: translate("activities_tab_list")
    },
    {
        name:"ActivityMap",
        component: ActivityMapView,
        tabBarLabel: translate("activities_tab_map")
    }
]
export const ActiviyTabNavigator = () => <TabNavigator screens={AtivityTabScreens}/>