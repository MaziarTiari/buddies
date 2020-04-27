import React from "react";
import translate from "../../../utils/language/translate";
import { ProfileTab } from "./ProfileTab";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationComponentNames } from "../componentNames";
import { stackScreenOptionHeaderStyle } from "../navigationStyles";
import FriendListContainer from "../../FriendListContainer/FriendListContainer";
import { ProfileStackHeaderButtonContainer } from './HeaderButtonContainer';

const Stack = createStackNavigator();

const ProfileStack = ({ navigation }: any) => (
    <Stack.Navigator>
        <Stack.Screen
            name={navigationComponentNames.ProfileTab}
            component={ProfileTab}
            options={{
                headerRight: () => 
                    <ProfileStackHeaderButtonContainer navigation={navigation} />,
                headerTitle: translate("menu_profile"),
                ...stackScreenOptionHeaderStyle,
            }}
        />
        <Stack.Screen
            name={navigationComponentNames.FriendListContainer}
            component={FriendListContainer}
            options={{
                headerTitle: translate("mutual_friends"),
                ...stackScreenOptionHeaderStyle,
            }}
        />
    </Stack.Navigator>
);

export default ProfileStack;
