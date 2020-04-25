import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import translate from "../../utils/language/translate";
import FeedScreen from "./FeedScreen";
import Color from "../../utils/theme/color";
import { styles } from "../index.style";

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
                    headerStyle: styles.stackNavScreenHeader,
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default FeedStack;
