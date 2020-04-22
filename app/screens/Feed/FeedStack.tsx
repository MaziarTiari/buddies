import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderButton from "../../components/HeaderButton/HeaderButton";
import translate from "../../utils/language/translate";
import FeedScreen from "./FeedScreen";

const StackNavigator = createStackNavigator();

const FeedStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name={translate("menu_feed")}
                component={FeedScreen}
                options={{
                    headerRight: () => {
                        return <HeaderButton icon="chat" onPress={() => {}} />;
                    },
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default FeedStack;
