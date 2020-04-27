import React from "react";
import translate from "../../../utils/language/translate";
import FeedList from "../../FeedList/FeedList";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationComponentNames } from "../componentNames";
import { stackScreenOptionHeaderStyle } from "../navigationStyles";

const Stack = createStackNavigator();

const FeedStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={navigationComponentNames.FeedContainer}
                component={FeedList}
                options={{ 
                    headerTitle: translate("menu_feed"),
                    ...stackScreenOptionHeaderStyle
                }}
            />
        </Stack.Navigator> 
    );
};

export default FeedStack;
