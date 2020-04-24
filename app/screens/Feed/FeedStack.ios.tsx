import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import translate from "../../utils/language/translate";
import FeedScreen from "./FeedScreen";
import Color from "../../utils/theme/color";
import { StackNavScreenHeaderStyle_ios } from "../index.style";

const StackNavigator = createStackNavigator();

const FeedStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    headerTitle: translate("menu_feed"),
                    headerTintColor: Color.secondaryText,
                    headerStyle: StackNavScreenHeaderStyle_ios,
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default FeedStack;
