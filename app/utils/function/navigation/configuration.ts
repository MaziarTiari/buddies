import { Platform } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import Color from "../../theme/color";
import { fontsizes, getResponsiveSize } from "../../theme/font";

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

export const tabBarOptions: MaterialTopTabBarOptions = {
    activeTintColor: Color.Theme.primaryItem,
    inactiveTintColor: Color.Theme.basicItem,
    style: { backgroundColor: Color.Theme.layoutBackground },
    indicatorStyle: { backgroundColor: Color.Theme.primaryItem },
    allowFontScaling: true,
};
