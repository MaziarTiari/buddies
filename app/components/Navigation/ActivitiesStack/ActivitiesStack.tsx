import React from "react";
import { View } from "react-native";
import translate from "../../../utils/language/translate";
import IconButton from "../../IconButton/IconButton";
import Color from "../../../utils/theme/color";
import { navigationComponentNames } from '../componentNames';
import { createStackNavigator } from "@react-navigation/stack";
import { ActivitiesTab } from "./ActivitiesTab";
import { stackScreenOptionHeaderStyle } from "../navigationStyles";
import ActivityList from "../../ActivityList/ActivityList";

const Stack = createStackNavigator();

const ActivitiesStack = ({ navigation }: any) => {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={navigationComponentNames.ActiviyTabNavigator}
                component={ActivitiesTab}
                options={{
                    headerTitle: translate("menu_activities"),
                    headerRight: () => <HeaderButtons navigation={navigation} />,
                    ...stackScreenOptionHeaderStyle,
                }}
            />
            <Stack.Screen
                name={navigationComponentNames.ActivityList}
                component={ActivityList}
                options={{ 
                    headerTitle: translate("menu_activities_favorites"),
                    ...stackScreenOptionHeaderStyle
                }}
            />
        </Stack.Navigator>
    );
};

const HeaderButtons = ({navigation}: any) => (
    <View style={{ flexDirection: "row" }}>
        <IconButton
            color={Color.secondaryText}
            icon="heart"
            onPress={() => navigation.navigate(navigationComponentNames.ActivityList)}
        />
        <IconButton
            color={Color.secondaryText}
            icon="wunderlist"
            onPress={() =>
                navigation.navigate(navigationComponentNames.ActivityList)
            }
        />
    </View>
)

export default ActivitiesStack;
