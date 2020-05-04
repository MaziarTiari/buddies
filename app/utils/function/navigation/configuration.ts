import { Platform } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import Color from "../../theme/color";
import { fontsizes, getResponsiveSize } from "../../theme/font";
import { MaterialBottomTabNavigationOptions, MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { MaterialBottomTabNavigationConfig } from "@react-navigation/material-bottom-tabs/lib/typescript/src/types";

export const RouteName = {
    Root: "Root",
    FeedList: "FeedList",
    Activity: {
        Tab: "ActivityTab",
        List: "ActivityList",
        Map: "ActivityMap",
        MyList: "ActivityMyList",
        MyFavorite: "ActivityMyFavorite",
    },
    Chat: {
        List: "ChatList",
        Chat: "Chat",
    },
    Profile: {
        Tab: "ProfileTab",
        About: "ProfileAbout",
        Activity: "ProfileActivity",
        Galery: "ProfileGalery",
        FriendList: "FriendList",
    },
};

export const screenOptions: StackNavigationOptions = {
    headerTintColor: Color.Theme.basicItem,
    headerTitleStyle: {
        fontSize: fontsizes.medium,
    },
    headerStyle: {
        backgroundColor: Color.Theme.layoutBackground,
        ...Platform.select({ ios: { height: getResponsiveSize(100) } }),
    },
};

export const bottomTabBarOptions: MaterialBottomTabNavigationOptions = {
    tabBarColor: Color.Theme.layoutBackground
}

export const tabBarOptions: MaterialTopTabBarOptions = {
    activeTintColor: Color.Theme.primaryItem,
    inactiveTintColor: Color.Theme.basicItem,
    style: { backgroundColor: Color.Theme.layoutBackground },
    indicatorStyle: { backgroundColor: Color.Theme.primaryItem },
    allowFontScaling: true,
};

export const bottomTabBarConfig: MaterialBottomTabNavigationConfig = {
    barStyle:{
        backgroundColor:Color.Theme.layoutBackground, 
        height: getResponsiveSize(70), 
        justifyContent:"center", 
    },
    style:{flex:1,padding:0, margin:0},
    labeled:false
}