import { Platform } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import { fontsizes, getResponsiveSize } from "../utils/font/font";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";

export const RouteName = {
    Root: "Root",
    FeedList: "FeedList",
    Activity: {
        List: "ActivityList",
        MyList: "ActivityMyList",
        Info: "ActivityInfo",
        Editor: "ActivityInfoEditor",
    },
    Map: "Map",
    Chat: {
        List: "ChatList",
        Chat: "Chat",
    },
    Profile: {
        OwnTab: "OwnProfileTab",
        OtherTab: "OtherProfileTab",
        About: "ProfileAbout",
        Activity: "ProfileActivity",
        Galery: "ProfileGalery",
        FriendList: "FriendList",
        Editor: {
            Menu: "ProfileEditorMenu",
            Personal: "ProfileEditorPersonal",
            Taglist: "ProfileEditorTagList",
        },
    },
    Settings: "Settings",
};

export const useNavOption = () => {
    const theme = useContext(ThemeContext).theme;

    const screenOptions: StackNavigationOptions = {
        headerTintColor: theme.App.basicItem,
        headerTitleStyle: {
            fontSize: fontsizes.medium,
        },
        headerStyle: {
            backgroundColor: theme.App.layoutBackground,
            ...Platform.select({ ios: { height: getResponsiveSize(100) } }),
        },
    };

    const tabBarOptions: MaterialTopTabBarOptions = {
        activeTintColor: theme.App.primaryItem,
        inactiveTintColor: theme.App.basicItem,
        style: { backgroundColor: theme.App.layoutBackground },
        indicatorStyle: { backgroundColor: theme.App.primaryItem },
        allowFontScaling: true,
    };

    return { screen: screenOptions, tabBar: tabBarOptions };
};
