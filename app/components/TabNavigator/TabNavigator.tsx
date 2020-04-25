import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Color from '../../utils/theme/color';

const Navigator = createMaterialTopTabNavigator();

interface ScreenTabNavigatorProps {
    screens: TabNavigatorScreen[]
}

export interface TabNavigatorScreen {
    name: string; 
    component: React.ComponentType<any>;
    tabBarLabel: string;
}

const TabNavigator = ( {screens}: ScreenTabNavigatorProps ) => {
    return (
        <Navigator.Navigator
            tabBarOptions={{
                activeTintColor: Color.primaryText,
                inactiveTintColor: Color.secondaryText,
                style: { backgroundColor: Color.navBackground },
                indicatorStyle: { backgroundColor: Color.primaryText },
            }}
        >
            {screens.map( (screen, index) => 
                <Navigator.Screen {...screen} key={index}/>
            )}
        </Navigator.Navigator>
    );
}

export default TabNavigator
