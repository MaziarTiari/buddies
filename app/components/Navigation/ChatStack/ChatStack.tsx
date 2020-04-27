import React from "react";
import translate from "../../../utils/language/translate";
import ChatList from "../../ChatList/ChatList";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationComponentNames } from "../componentNames";
import { stackScreenOptionHeaderStyle } from "../navigationStyles";

const Stack = createStackNavigator();

const ChatStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={navigationComponentNames.ChatListScreen}
                component={ChatList}
                options={{ 
                    headerTitle: translate("menu_chat"),
                    ...stackScreenOptionHeaderStyle
                }}
            />
        </Stack.Navigator> 
    );
};

export default ChatStack;
