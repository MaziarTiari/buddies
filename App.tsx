import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileScreen from "./app/screens/ProfileScreen/ProfileScreen";
import FriendsScreen from "./app/screens/FriendsScreen/FriendsScreen";
import ActivitiesScreen from "./app/screens/ActivitiesScreen/ActivitiesScreen";
import SettingsScreen from "./app/screens/SettingsScreen/SettingsScreen";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Profile"
                screenOptions={{ tabBarColor: "#222" }}
            >
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="account"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Friends"
                    component={FriendsScreen}
                    options={{
                        tabBarLabel: "Friends",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="account-group"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Activities"
                    component={ActivitiesScreen}
                    options={{
                        tabBarLabel: "Activities",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="rocket"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: "Settings",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="settings"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
