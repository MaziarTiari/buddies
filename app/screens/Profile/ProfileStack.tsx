import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderButton from "../../components/HeaderButton/HeaderButton";
import translate from "../../utils/language/translate";
import ProfileTab from "./ProfileTab";
import Color from "../../utils/theme/color";

const StackNavigator = createStackNavigator();

const ProfileStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name={translate("menu_profile")}
                component={ProfileTab}
                options={{
                    headerRight: () => (
                        <HeaderButton
                            color={Color.secondaryText}
                            icon="dots-vertical-circle-outline"
                            onPress={() => {}}
                        />
                    ),

                    headerTintColor: Color.secondaryText,
                    headerStyle: { backgroundColor: Color.navBackground },
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default ProfileStack;
