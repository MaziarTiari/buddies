import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedStack from "./app/screens/Feed/FeedStack";
import ActivitiesStack from "./app/screens/Activities/ActivitiesStack";
import ProfileStack from "./app/screens/Profile/ProfileStack";
import SettingsStack from "./app/screens/Settings/SettingsStack";
import translate from "./app/utils/language/translate";

const BottomNavigator = createMaterialBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <BottomNavigator.Navigator
                initialRouteName="Feed"
                screenOptions={{ tabBarColor: "#222" }}
                labeled={false}
            >
                <BottomNavigator.Screen
                    name="Feed"
                    component={FeedStack}
                    options={{
                        tabBarLabel: translate("menu_feed"),
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <BottomNavigator.Screen
                    name="Activities"
                    component={ActivitiesStack}
                    options={{
                        tabBarLabel: translate("menu_activities"),
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="rocket"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <BottomNavigator.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        tabBarLabel: translate("menu_profile"),
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="account"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <BottomNavigator.Screen
                    name="Settings"
                    component={SettingsStack}
                    options={{
                        tabBarLabel: translate("menu_settings"),
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="settings"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
            </BottomNavigator.Navigator>
        </NavigationContainer>
    );
};

export default App;
