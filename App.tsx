import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedStack from "./app/screens/Feed/FeedStack";
import ActivitiesStack from "./app/screens/Activities/ActivitiesStack";
import ChatStack from "./app/screens/Chat/ChatStack";
import ProfileStack from "./app/screens/Profile/ProfileStack";
import translate from "./app/utils/language/translate";
import Color from "./app/utils/theme/color";

const BottomNavigator = createMaterialBottomTabNavigator();

const Icon = (icon: string, focused: boolean) => {
    return (
        <MaterialCommunityIcons
            name={icon}
            color={focused ? Color.primaryText : Color.secondaryText}
            size={26}
        />
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <BottomNavigator.Navigator
                initialRouteName="Feed"
                screenOptions={{ tabBarColor: Color.navBackground }}
                labeled={false}
            >
                <BottomNavigator.Screen
                    name="Feed"
                    component={FeedStack}
                    options={{
                        tabBarLabel: translate("menu_feed"),
                        tabBarIcon: ({ focused }) => Icon("home", focused),
                    }}
                />
                <BottomNavigator.Screen
                    name="Activities"
                    component={ActivitiesStack}
                    options={{
                        tabBarLabel: translate("menu_activities"),
                        tabBarIcon: ({ focused }) => Icon("rocket", focused),
                    }}
                />
                <BottomNavigator.Screen
                    name="Chat"
                    component={ChatStack}
                    options={{
                        tabBarLabel: translate("menu_chat"),
                        tabBarIcon: ({ focused }) => Icon("chat", focused),
                    }}
                />
                <BottomNavigator.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        tabBarLabel: translate("menu_profile"),
                        tabBarIcon: ({ focused }) => Icon("account", focused),
                    }}
                />
            </BottomNavigator.Navigator>
        </NavigationContainer>
    );
};

export default App;
