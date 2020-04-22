import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import translate from "../../utils/language/translate";
import ChatListScreen from "./ChatlistScreen";
import Color from "../../utils/theme/color";

const StackNavigator = createStackNavigator();

const ChatStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name={translate("menu_chat")}
                component={ChatListScreen}
                options={{
                    headerTintColor: Color.secondaryText,
                    headerStyle: { backgroundColor: Color.navBackground },
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default ChatStack;
