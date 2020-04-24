import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import translate from "../../utils/language/translate";
import ChatListScreen from "./ChatlistScreen";
import Color from "../../utils/theme/color";
import { StackNavScreenHeaderStyle } from "../index.style";

const StackNavigator = createStackNavigator();

const ChatStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Chatlist"
                component={ChatListScreen}
                options={{
                    headerTitle: translate("menu_chat"),
                    headerTintColor: Color.secondaryText,
                    headerStyle: StackNavScreenHeaderStyle,
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default ChatStack;
