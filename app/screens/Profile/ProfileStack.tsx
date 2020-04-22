import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderButton from "../../components/HeaderButton/HeaderButton";
import translate from "../../utils/language/translate";
import ProfileTab from "./ProfileTab";

const StackNavigator = createStackNavigator();

const ProfileStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name={translate("menu_profile")}
                component={ProfileTab}
                options={{
                    headerRight: () => {
                        return (
                            <HeaderButton
                                icon="dots-vertical-circle-outline"
                                onPress={() => {}}
                            />
                        );
                    },
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default ProfileStack;
