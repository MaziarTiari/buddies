import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import translate from "../../utils/language/translate";
import HeaderButton from "../../components/HeaderButton/HeaderButton";
import ActivitiesTab from "./ActivitiesTab";
import Color from "../../utils/theme/color";
import ParticipatedActivitiesScreen from "./ParticipatedActivitiesScreen";
import FavoriteActivitiesScreen from "./FavoriteActivitiesScreen";
import { StackNavScreenHeaderStyle_ios } from "../index.style";

const StackNavigator = createStackNavigator();

interface ActivitiesStackProps {
    navigation: any;
}

const ActivitiesStack = ({ navigation }: ActivitiesStackProps) => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Activities"
                component={ActivitiesTab}
                options={{
                    headerTitle: translate("menu_activities"),
                    headerRight: () => (
                        <View style={{ flexDirection: "row" }}>
                            <HeaderButton
                                color={Color.secondaryText}
                                icon="heart"
                                onPress={() => navigation.navigate("FavoriteActivities")}
                            />
                            <HeaderButton
                                color={Color.secondaryText}
                                icon="wunderlist"
                                onPress={() =>
                                    navigation.navigate("ParticipatedActivities")
                                }
                            />
                        </View>
                    ),
                    headerTintColor: Color.secondaryText,
                    headerStyle: StackNavScreenHeaderStyle_ios,
                }}
            />
            <StackNavigator.Screen
                name="ParticipatedActivities"
                component={ParticipatedActivitiesScreen}
                options={{
                    headerTitle: translate("menu_activities_participated"),
                    headerTintColor: Color.secondaryText,
                    headerStyle: StackNavScreenHeaderStyle_ios,
                }}
            />
            <StackNavigator.Screen
                name="FavoriteActivities"
                component={FavoriteActivitiesScreen}
                options={{
                    headerTitle: translate("menu_activities_favorites"),
                    headerTintColor: Color.secondaryText,
                    headerStyle: StackNavScreenHeaderStyle_ios,
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default ActivitiesStack;
