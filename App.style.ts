import { Platform } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import Color from "./app/utils/theme/color";

export const screenOptions: StackNavigationOptions = {
    headerTintColor: Color.secondaryText,
    headerStyle: {
        backgroundColor: Color.navBackground,
        ...Platform.select({ ios: { height: 100 } }),
    },
};

export const tabBarOptions: MaterialTopTabBarOptions = {
    activeTintColor: Color.primaryText,
    inactiveTintColor: Color.secondaryText,
    style: { backgroundColor: Color.navBackground },
    indicatorStyle: { backgroundColor: Color.primaryText },
};
