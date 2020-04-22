import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import translate from "../../utils/language/translate";
import HeaderButton from "../../components/HeaderButton/HeaderButton";
import ActivitiesTab from "./ActivitiesTab";

const StackNavigator = createStackNavigator();

const ActivitiesStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name={translate("menu_activities")}
                component={ActivitiesTab}
                options={{
                    headerRight: () => {
                        return <HeaderButton icon="wunderlist" onPress={() => {}} />;
                    },
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default ActivitiesStack;
