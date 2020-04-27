import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Color from "./app/utils/theme/color";
import FeedStack from "./app/components/Navigation/FeedStack/FeedStack";
import { ButtomStackNavIcon } from "./app/components/BottomNavigationIcon/BottomNavigationIcon";
import translate from "./app/utils/language/translate";
import ActivitiesStack from "./app/components/Navigation/ActivitiesStack/ActivitiesStack";
import ChatStack from "./app/components/Navigation/ChatStack/ChatStack";
import ProfileStack from "./app/components/Navigation/ProfileStack/ProfileStack";
import { navigationComponentNames } from "./app/components/Navigation/componentNames";

const Tab = createMaterialBottomTabNavigator();

const App = () => (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName={navigationComponentNames.FeedStack}
            screenOptions={{ tabBarColor: Color.navBackground }}
            labeled={false}
        >
            <Tab.Screen
                name={navigationComponentNames.FeedStack}
                component={FeedStack}
                options={{
                    tabBarLabel: translate("menu_feed"),
                    tabBarIcon: ({ focused }) => 
                        <ButtomStackNavIcon icon="home" focused={focused}/>,
                }}
            />
            <Tab.Screen
                name={navigationComponentNames.ActivitiesStack}
                component={ActivitiesStack}
                options={{
                    tabBarLabel: translate("menu_activities"),
                    tabBarIcon: ({ focused }) => 
                        <ButtomStackNavIcon icon="rocket" focused={focused}/>,
                }}
            />
            <Tab.Screen
                name={navigationComponentNames.ChatStack}
                component={ChatStack}
                options={{
                    tabBarLabel: translate("menu_chat"),
                    tabBarIcon: ({ focused }) => 
                        <ButtomStackNavIcon icon="chat" focused={focused}/>,
                }}
            />
            <Tab.Screen
                name={navigationComponentNames.ProfileStack}
                component={ProfileStack}
                options={{
                    tabBarLabel: translate("menu_profile"),
                    tabBarIcon: ({ focused }) => 
                        <ButtomStackNavIcon icon="account" focused={focused}/>,
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
);

export default App;
