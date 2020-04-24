import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderButton from "../../components/HeaderButton/HeaderButton";
import translate from "../../utils/language/translate";
import ProfileTab from "./ProfileTab";
import Color from "../../utils/theme/color";
import { StackNavScreenHeaderStyle_ios } from "../index.style";

const StackNavigator = createStackNavigator();

const ProfileStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Profile"
                component={ProfileTab}
                options={{
                    headerRight: () => (
                        <HeaderButton
                            color={Color.secondaryText}
                            icon="dots-vertical-circle-outline"
                            onPress={() => {}}
                        />
                    ),
                    headerTitle: translate("menu_profile"),
                    headerTintColor: Color.secondaryText,
                    headerStyle: StackNavScreenHeaderStyle_ios,
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default ProfileStack;
