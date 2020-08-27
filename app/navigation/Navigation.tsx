import React from 'react'
import { useNavOption, RouteName } from './Navigation.config';
import BottomTab from './BottomTab';
import Chat from '../components/Chat/Chat';
import ActivityList from '../components/ActivityList/ActivityList';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityInfo from '../components/ActivityInfo/ActivityInfo';
import CategorizedInputList from '../components/CategorizedInputList/CategorizedInputList';
import ProfileEditForm from '../components/ProfileEditForm/ProfileEditForm';
import ActivityEditForm from '../components/ActivityEditForm/ActivityEditForm';
import { LeftActivityHeader, RightActivityHeader } from '../components/ActivityHeader/ActivityHeader';
import SettingsForm from '../components/SettingsForm/SettingsForm';
import ProfileTab from './ProfileTab';
import { RightProfileHeader } from '../components/ProfileHeader/ProfileHeader';
import ProfileList from '../components/ProfileList/ProfileList';

const Stack = createStackNavigator();

const Navigation = () => {
    const screenOptions = useNavOption().screen;
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName={RouteName.Root}>
            <Stack.Screen name={RouteName.Root} component={BottomTab} />
            <Stack.Screen name={RouteName.Messages.Chat} component={Chat} />
            <Stack.Screen name={RouteName.Activity.OwnList} component={ActivityList} />
            <Stack.Screen name={RouteName.Activity.Info} component={ActivityInfo} options={{
                headerRight: () => <RightActivityHeader />,
                headerLeft: () => <LeftActivityHeader />
            }} />
            <Stack.Screen name={RouteName.Taglist} component={CategorizedInputList} />
            <Stack.Screen name={RouteName.Profile.EditForm} component={ProfileEditForm} />
            <Stack.Screen name={RouteName.Activity.EditForm} component={ActivityEditForm} />
            <Stack.Screen name={RouteName.Settings} component={SettingsForm} />
            <Stack.Screen name={RouteName.Profile.OtherTab} component={ProfileTab} options={{
                headerRight: () => <RightProfileHeader />
            }} />
            <Stack.Screen name={RouteName.Profile.ProfileList} component={ProfileList} />
        </Stack.Navigator>
    );
};

export default Navigation;
