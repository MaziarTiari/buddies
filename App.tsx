import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ActivityList from "./app/components/ActivityList/ActivityList";
import FriendList from "./app/components/FriendList/FriendList";
import Chat from "./app/components/Chat/Chat";
import { RouteName, screenOptions } from "./app/utils/function/navigation/configuration";
import BottomTab from "./app/components/BottomTab/BottomTab";

const Stack = createStackNavigator();

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
                <Stack.Screen name={RouteName.Chat.Chat} component={Chat} />
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
