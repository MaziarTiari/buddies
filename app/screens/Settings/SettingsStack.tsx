import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import translate from "../../utils/language/translate";
import SettingsScreen from "./SettingsScreen";

const StackNavigator = createStackNavigator();

const SettingsStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name={translate("menu_settings")}
                component={SettingsScreen}
            />
        </StackNavigator.Navigator>
    );
};

export default SettingsStack;
