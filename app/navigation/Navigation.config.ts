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
        Tab: "ActivityTab",
        List: "ActivityList",
        Map: "ActivityMap",
        MyList: "ActivityMyList",
        MyFavorite: "ActivityMyFavorite",
        Info: "ActivityInfo",
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
        Editor: {
            Menu: "ProfileEditorMenu",
            Personal: "ProfileEditorPersonal",
            Taglist: "ProfileEditorTagList",
        },
    },
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
