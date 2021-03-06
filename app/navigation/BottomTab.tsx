import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RouteName, useNavOption } from './Navigation.config';
import ActivityListHeader from '../components/ActivityListHeader/ActivityListHeader';
import FeedList from '../components/FeedList/FeedList';
import ChatList from '../components/ChatList/ChatList';
import ProfileTab from './ProfileTab';
import {
    LeftProfileHeader,
    RightProfileHeader
} from '../components/ProfileHeader/ProfileHeader';
import { ThemeContext } from '../context/ThemeContext/ThemeContext';
import { LanguageContext } from '../context/LanguageContext/LanguageContext';
import ActivityList from '../components/ActivityList/ActivityList';
import Map from '../components/Map/Map';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SessionContext } from '../context/SessionContext/SessionContext';
import BadgedIcon from '../components/BadgedIcon/BadgedIcon';
import { ActivityContext } from '../context/ActivityContext/ActivityContext';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = ({ route }: any) => {
    const navigation = useNavigation();
    const { theme, themeType } = useContext(ThemeContext);
    const { screen: screenOptions } = useNavOption();
    const { translations } = useContext(LanguageContext);
    const { userIsEditingProfile, userProfile } = useContext(SessionContext);
    const { unhandledApplications } = useContext(ActivityContext);

    const getHeaderTitle = (routeName: string): string => {
        switch (routeName) {
            case RouteName.Feed:
                return translations.feed;
            case RouteName.Profile.OwnTab:
                return userProfile.username;
            case RouteName.Map:
                return translations.explore;
            case RouteName.Activity.OtherList:
            case RouteName.Root:
                return translations.activities;
            case RouteName.Messages.List:
                return translations.messages;
            default:
                return 'unknown_route';
        }
    };

    const getHeaderRight = (
        routeName: string
    ): (() => JSX.Element) | undefined => {
        switch (routeName) {
            case RouteName.Activity.OtherList:
            case RouteName.Root:
                return () => <ActivityListHeader />;
            case RouteName.Profile.OwnTab:
                return () => <RightProfileHeader />;
        }
        return undefined;
    };

    const getHeaderLeft = (
        routeName: string
    ): (() => JSX.Element) | undefined => {
        switch (routeName) {
            case RouteName.Profile.OwnTab:
                return userIsEditingProfile
                    ? () => <LeftProfileHeader />
                    : undefined;
        }
        return undefined;
    };

    const getBottomIcon = (
        icon: string,
        focused: boolean,
        badgeValue?: number
    ): JSX.Element => (
        <BadgedIcon
            icon={icon}
            size={26}
            color={focused ? theme.App.primaryItem : theme.App.basicItem}
            value={badgeValue}
        />
    );

    const currentRoute = route.state
        ? route.state.routes[route.state.index].name
        : route.params?.screen || RouteName.Root;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: getHeaderTitle(currentRoute),
            headerRight: getHeaderRight(currentRoute),
            headerLeft: getHeaderLeft(currentRoute),
            screenOptions: screenOptions
        });
    }, [navigation, currentRoute, userIsEditingProfile]);

    return (
        <Tab.Navigator
            initialRouteName={RouteName.Activity.OtherList}
            screenOptions={{ tabBarColor: theme.App.layoutBackground }}
            labeled={false}
            barStyle={{
                height: userIsEditingProfile ? 0 : undefined,
                borderTopWidth: themeType === 'light' ? 1 : 0,
                borderColor: '#E5E5E5',
                shadowColor: "#0000",
                shadowOffset: {
                    width: 5,
                    height: 5
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 24
                }}
        >
            <Tab.Screen
                name={RouteName.Activity.OtherList}
                component={ActivityList}
                options={{
                    tabBarIcon: ({ focused }) =>
                        getBottomIcon('rocket', focused, unhandledApplications)
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
                name={RouteName.Messages.List}
                component={ChatList}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon('chat', focused)
                }}
            />
            <Tab.Screen
                name={RouteName.Feed}
                component={FeedList}
                options={{
                    tabBarIcon: ({ focused }) => getBottomIcon('bell', focused)
                }}
            />
            <Tab.Screen
                name={RouteName.Profile.OwnTab}
                component={ProfileTab}
                options={{
                    tabBarIcon: ({ focused }) =>
                        getBottomIcon('account', focused)
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
