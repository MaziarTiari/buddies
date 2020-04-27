import { StyleSheet, Platform } from "react-native";
import Color from "../../utils/theme/color";
import { StackNavigationOptions } from "@react-navigation/stack";
import { MaterialTopTabNavigationOptions, MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";

const styles = StyleSheet.create({
    stackNavScreenHeader: {
        backgroundColor: Color.navBackground,
        ...Platform.select({
            ios: {
                height: 100
            }
        })
    }
});

export const stackScreenOptionHeaderStyle: StackNavigationOptions = {
    headerTintColor: Color.secondaryText,
    headerStyle: styles.stackNavScreenHeader
}

export const tabBarOptions: MaterialTopTabBarOptions = {
    activeTintColor: Color.primaryText,
    inactiveTintColor: Color.secondaryText,
    style: { backgroundColor: Color.navBackground },
    indicatorStyle: { backgroundColor: Color.primaryText },
}