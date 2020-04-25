import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Color from '../../utils/theme/color';
import FeedScreenNavigator from '../FeedContainer/ScreenNavigator';
import translate from '../../utils/language/translate';
import ActivityStackNavigator from '../ActivityContainer/ScreenNavigator/ActivityStackNavigator';
import ChatStack from '../MessageContainer/ScreenNavigator';
import ProfileStack from '../ProfileVewContainer/ScreenNavigator/ProfileStack';
import { ButtomStackNavIcon } from '../BottomNavigationIcon/BottomNavigationIcon';

const BottomNavigator = createMaterialBottomTabNavigator();

const AppNavigationContainer = () => {
    return (
        <NavigationContainer>
        <BottomNavigator.Navigator
            initialRouteName="Feed"
            screenOptions={{ tabBarColor: Color.navBackground }}
            labeled={false}
        >
            <BottomNavigator.Screen
                name="Feed"
                component={FeedScreenNavigator}
                options={{
                    tabBarLabel: translate("menu_feed"),
                    tabBarIcon: ({ focused }) => 
                        <ButtomStackNavIcon icon="home" focused={focused}/>,
                }}
            />
            <BottomNavigator.Screen
                name="Activities"
                component={ActivityStackNavigator}
                options={{
                    tabBarLabel: translate("menu_activities"),
                    tabBarIcon: ({ focused }) => 
                        <ButtomStackNavIcon icon="rocket" focused={focused}/>,
                }}
            />
            <BottomNavigator.Screen
                name="Chat"
                component={ChatStack}
                options={{
                    tabBarLabel: translate("menu_chat"),
                    tabBarIcon: ({ focused }) => 
                        <ButtomStackNavIcon icon="chat" focused={focused}/>,
                }}
            />
            <BottomNavigator.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: translate("menu_profile"),
                    tabBarIcon: ({ focused }) => 
                        <ButtomStackNavIcon icon="account" focused={focused}/>,
                }}
            />
        </BottomNavigator.Navigator>
    </NavigationContainer>
    )
}

export default AppNavigationContainer
