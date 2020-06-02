import React from 'react'
import { useNavOption, RouteName } from './Navigation.config';
import BottomTab from './BottomTab';
import FriendList from '../components/FriendList/FriendList';
import Chat from '../components/Chat/Chat';
import ActivityList from '../components/ActivityList/ActivityList';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityInfo from '../components/ActivityInfo/ActivityInfo';
import ProfileEditorMenu from '../components/ProfileEditorMenu/ProfileEditorMenu';
import ProfileEditorPersonal from '../components/ProfileEditorPersonal/ProfileEditorPersonal';
import ProfileEditorTagList from '../components/ProfileEditorTagList/ProfileEditorTagList';

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
            <Stack.Screen name={RouteName.Activity.Info} component={ActivityInfo} />
            <Stack.Screen name={RouteName.Profile.Editor.Menu} component={ProfileEditorMenu} />
            <Stack.Screen name={RouteName.Profile.Editor.Taglist} component={ProfileEditorTagList} />
            <Stack.Screen name={RouteName.Profile.Editor.Personal} component={ProfileEditorPersonal} />
        </Stack.Navigator>
    );
};

export default Navigation;
