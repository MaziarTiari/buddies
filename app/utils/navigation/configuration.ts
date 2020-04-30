import { Platform } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import Color from "../theme/color";

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
