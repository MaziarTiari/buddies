import React, { useContext, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RouteName, useNavOption } from "./Navigation.config";
import ActivityListHeader from "../components/ActivityListHeader/ActivityListHeader";
import FeedList from "../components/FeedList/FeedList";
import ChatList from "../components/ChatList/ChatList";
import ProfileTab from "./ProfileTab";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { LanguageContext } from "../context/LanguageContext/LanguageContext";
import ActivityList from "../components/ActivityList/ActivityList";
import Map from "../components/Map/Map";
import { useNavigation } from "@react-navigation/native";
import { SessionContext } from "../context/SessionContext/SessionContext";

const Tab = createMaterialBottomTabNavigator();

const BottomTab = ({ route }: any) => {

    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const { screen: screenOptions } = useNavOption();
    const { translations } = useContext(LanguageContext);
    const { userIsEditingProfile } = useContext(SessionContext);

    // TODO: find nicer solution - maybe HOC or FAC
    const getHeaderTitle = (routeName: string): string => {
        switch (routeName) {
            case RouteName.Root:
            case RouteName.FeedList:
                return translations.menu_feed;
            case RouteName.Profile.Tab:
                return translations.menu_profile;
            case RouteName.Map:
                return translations.menu_map;
            case RouteName.Activity.List:
                return translations.menu_activities;
            case RouteName.Chat.List:
                return translations.menu_chat;
            default:
                return "unknown_route";
        }
    };

    const getHeaderRight = (routeName: string): (() => JSX.Element) | undefined => {
        switch (routeName) {
            case RouteName.Activity.List:
                return () => <ActivityListHeader />;
            case RouteName.Profile.Tab:
                return () => <ProfileHeader />;
        }
        return undefined;
    };

    const getBottomIcon = (icon: string, focused: boolean): React.ReactNode => (
        <MaterialCommunityIcons
            name={icon}
            size={26}
            color={focused ? theme.App.primaryItem : theme.App.basicItem}
        />
    );

    const currentRoute = route.state
        ? route.state.routes[route.state.index].name
        : route.params?.screen || RouteName.Root;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: getHeaderTitle(currentRoute),
            headerRight: getHeaderRight(currentRoute),
            screenOptions: screenOptions,
        });
    }, [navigation, currentRoute]);

    return (
        <Tab.Navigator
            initialRouteName={RouteName.FeedList}
            screenOptions={{ tabBarColor: theme.App.layoutBackground }}
            labeled={false}
            barStyle={{ height: userIsEditingProfile ? 0 : undefined }}
        >
            <Tab.Screen
                name={RouteName.FeedList}
                component={FeedList}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon("home", focused),
                }}
            />
            <Tab.Screen
                name={RouteName.Activity.List}
                component={ActivityList}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon("rocket", focused),
                }}
            />
            <Tab.Screen
                name={RouteName.Map}
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon("map", focused),
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
