import React from "react";
import IconButton from "../../IconButton/IconButton";
import translate from "../../../utils/language/translate";
import { ProfileTab } from "./ProfileTab";
import Color from "../../../utils/theme/color";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationComponentNames } from "../componentNames";
import { stackScreenOptionHeaderStyle } from "../navigationStyles";

const Stack = createStackNavigator();

const ProfileStack = ( {navigation}: any ) => (
    <Stack.Navigator>
        <Stack.Screen
            name={navigationComponentNames.ProfileTab}
            component={ProfileTab}
            options={{
                headerRight: () => <HeaderButtons navigation={navigation} />,
                headerTitle: translate("menu_profile"),
                ...stackScreenOptionHeaderStyle
            }}
        />
    </Stack.Navigator>
);

const HeaderButtons = ({navigation}: any) => (
    <IconButton
        color={Color.secondaryText}
        icon="dots-vertical-circle-outline"
        onPress={() => {}}
    />
);

export default ProfileStack;
