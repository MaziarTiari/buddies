import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Color from "./app/utils/theme/color";
import translate from "./app/utils/language/translate";
import { ButtonNavigationIcon } from "./app/components/BottomNavigationIcon/BottomNavigationIcon";
import FeedList from "./app/components/FeedList/FeedList";
import ActivityList from "./app/components/ActivityList/ActivityList";
import ChatList from "./app/components/ChatList/ChatList";
import FriendList from "./app/components/FriendList/FriendList";
import ChatContainer from "./app/components/ChatContainer/ChatContainer";
import ActivityMap from "./app/components/ActivityMap/ActivityMap";
import ProfileAbout from "./app/components/ProfileAbout/ProfileAbout";
import ProfileActivity from "./app/components/ProfileActivity/ProfileActivity";
import ProfileGalery from "./app/components/ProfileGalery/ProfileGalery";
import { tabBarOptions, screenOptions } from "./App.style";
import ActivityHeader from "./app/components/ActivityHeader/ActivityHeader";
import ProfileHeader from "./app/components/ProfileHeader/ProfileHeader";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const ActivitiesTabNavigator = createMaterialTopTabNavigator();
const ProfileTabNavigator = createMaterialTopTabNavigator();

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

const ActivitiesTab = () => (
    <ActivitiesTabNavigator.Navigator tabBarOptions={tabBarOptions}>
        <ActivitiesTabNavigator.Screen
            name={RouteName.Activity.List}
            component={ActivityList}
            options={{ tabBarLabel: translate("activities_tab_list") }}
        />
        <ActivitiesTabNavigator.Screen
            name={RouteName.Activity.Map}
            component={ActivityMap}
            options={{ tabBarLabel: translate("activities_tab_map") }}
        />
    </ActivitiesTabNavigator.Navigator>
);

const ProfileTab = () => (
    <ProfileTabNavigator.Navigator tabBarOptions={tabBarOptions}>
        <ProfileTabNavigator.Screen
            name={RouteName.Profile.About}
            component={ProfileAbout}
            options={{ tabBarLabel: translate("profile_tab_about") }}
        />
        <ProfileTabNavigator.Screen
            name={RouteName.Profile.Activity}
            component={ProfileActivity}
            options={{ tabBarLabel: translate("profile_tab_activity") }}
        />
        <ProfileTabNavigator.Screen
            name={RouteName.Profile.Galery}
            component={ProfileGalery}
            options={{ tabBarLabel: translate("profile_tab_galery") }}
        />
    </ProfileTabNavigator.Navigator>
);

function getHeaderTitle(routeName: string): string {
    console.log("RouteName", routeName);
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

const BottomTab = ({ navigation, route }: any) => {
    React.useLayoutEffect(() => {
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
                    tabBarIcon: ({ focused }) => (
                        <ButtonNavigationIcon icon="home" focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name={RouteName.Activity.Tab}
                component={ActivitiesTab}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ButtonNavigationIcon icon="rocket" focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name={RouteName.Chat.List}
                component={ChatList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ButtonNavigationIcon icon="chat" focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name={RouteName.Profile.Tab}
                component={ProfileTab}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ButtonNavigationIcon icon="account" focused={focused} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName={RouteName.Root}
            >
                <Stack.Screen name={RouteName.Root} component={BottomTab} />
                <Stack.Screen
                    name={RouteName.Profile.FriendList}
                    component={FriendList}
                />
                <Stack.Screen name={RouteName.Chat.Chat} component={ChatContainer} />
                <Stack.Screen
                    name={RouteName.Activity.MyFavorite}
                    component={ActivityList}
                />
                <Stack.Screen name={RouteName.Activity.MyList} component={ActivityList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
