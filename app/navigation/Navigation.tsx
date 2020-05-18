import React from "react";
import { useNavOption, RouteName } from "./Navigation.config";
import BottomTab from "./BottomTab";
import FriendList from "../components/FriendList/FriendList";
import Chat from "../components/Chat/Chat";
import ActivityList from "../components/ActivityList/ActivityList";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileEditor from "../components/ProfileEditor/ProfileEditor";

const Stack = createStackNavigator();

const Navigation = () => {
    const screenOptions = useNavOption().screen;
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName={RouteName.Root}>
            <Stack.Screen name={RouteName.Root} component={BottomTab} />
            <Stack.Screen name={RouteName.Profile.FriendList} component={FriendList} />
            <Stack.Screen name={RouteName.Chat.Chat} component={Chat} />
            <Stack.Screen name={RouteName.Activity.MyFavorite} component={ActivityList} />
            <Stack.Screen name={RouteName.Activity.MyList} component={ActivityList} />
            <Stack.Screen name={RouteName.Profile.Editor} component={ProfileEditor} />
        </Stack.Navigator>
    );
};

export default Navigation;
