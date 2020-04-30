import React, { useLayoutEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RouteName } from "../../utils/navigation/configuration";
import translate from "../../utils/language/translate";
import ActivityHeader from "../ActivityHeader/ActivityHeader";
import Color from "../../utils/theme/color";
import FeedList from "../FeedList/FeedList";
import ActivitiesTab from "../ActivityTab/ActivityTab";
import ChatList from "../ChatList/ChatList";
import ProfileTab from "../ProfileTab/ProfileTab";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

function getHeaderTitle(routeName: string): string {
    switch (routeName) {
        case RouteName.Root:
        case RouteName.FeedList:
            return translate("menu_feed");
        case RouteName.Profile.Tab:
            return translate("menu_profile");
        case RouteName.Activity.Tab:
            return translate("menu_activities");
        case RouteName.Chat.List:
            return translate("menu_chat");
    }
    return "unknown_route";
}

function getHeaderRight(routeName: string, navigation: any): (() => JSX.Element) | null {
    switch (routeName) {
        case RouteName.Activity.Tab:
            return () => <ActivityHeader navigation={navigation} />;
        case RouteName.Profile.Tab:
            return () => <ProfileHeader navigation={navigation} />;
    }
    return null;
}

function getBottomIcon(icon: string, focused: boolean): React.ReactNode {
    return (
        <MaterialCommunityIcons
            name={icon}
            color={focused ? Color.primaryText : Color.secondaryText}
            size={26}
        />
    );
}

const BottomTab = ({ navigation, route }: any) => {
    useLayoutEffect(() => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || RouteName.Root;
        navigation.setOptions({
            headerTitle: getHeaderTitle(routeName),
            headerRight: getHeaderRight(routeName, navigation),
        });
    }, [navigation, route]);

    return (
        <Tab.Navigator
            initialRouteName={RouteName.FeedList}
            screenOptions={{ tabBarColor: Color.navBackground }}
            labeled={false}
        >
            <Tab.Screen
                name={RouteName.FeedList}
                component={FeedList}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon("home", focused),
                }}
            />
            <Tab.Screen
                name={RouteName.Activity.Tab}
                component={ActivitiesTab}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon("rocket", focused),
                }}
            />
            <Tab.Screen
                name={RouteName.Chat.List}
                component={ChatList}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon("chat", focused),
                }}
            />
            <Tab.Screen
                name={RouteName.Profile.Tab}
                component={ProfileTab}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon("account", focused),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
