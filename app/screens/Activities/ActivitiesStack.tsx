import React, { ReactPropTypes } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import translate from "../../utils/language/translate";
import HeaderButton from "../../components/HeaderButton/HeaderButton";
import ActivitiesTab from "./ActivitiesTab";
import Color from "../../utils/theme/color";
import ParticipatedActivitiesScreen from "./ParticipatedActivitiesScreen";

const StackNavigator = createStackNavigator();

const ActivitiesStack = ({ navigation }) => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Activities"
                component={ActivitiesTab}
                options={{
                    headerTitle: translate("menu_activities"),
                    headerRight: () => (
                        <HeaderButton
                            color={Color.secondaryText}
                            icon="wunderlist"
                            onPress={() => navigation.navigate("ParticipatedActivities")}
                        />
                    ),
                    headerTintColor: Color.secondaryText,
                    headerStyle: { backgroundColor: Color.navBackground },
                }}
            />
            <StackNavigator.Screen
                name="ParticipatedActivities"
                component={ParticipatedActivitiesScreen}
                options={{
                    headerTitle: translate("menu_activities_participated"),
                    headerTintColor: Color.secondaryText,
                    headerStyle: { backgroundColor: Color.navBackground },
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default ActivitiesStack;
