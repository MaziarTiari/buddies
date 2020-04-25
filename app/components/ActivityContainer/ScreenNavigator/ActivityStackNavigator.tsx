import React from "react";
import { View } from "react-native";
import translate from "../../../utils/language/translate";
import IconButton from "../../IconButton/IconButton";
import Color from "../../../utils/theme/color";
import ParticipatedActivitiesView 
    from "../ParticipatedActivitiesView/ParticipatedActivitiesView";
import FavoriteActivitiesView 
    from "../FavoriteActivitiesView/FavoriteActivitiesView";
import StackNavigator from "../../StackNavigator/StackNavigator";
import { ActiviyTabNavigator } from "./ActiviyTabNavigator";

const ActivityStackNavigator = ({ navigation }: any) => {

    return (
        <StackNavigator screenDefinitionList = {[
            {
                name:"Activities",
                component: ActiviyTabNavigator,
                options:{
                    headerTitle: translate("menu_activities"),
                    headerRight: () => (
                        <View style={{ flexDirection: "row" }}>
                            <IconButton
                                color={Color.secondaryText}
                                icon="heart"
                                onPress={() => navigation.navigate("FavoriteActivities")}
                            />
                            <IconButton
                                color={Color.secondaryText}
                                icon="wunderlist"
                                onPress={() =>
                                    navigation.navigate("ParticipatedActivities")
                                }
                            />
                        </View>
                    ),
                }
            },
            {
                name:"ParticipatedActivities",
                component:ParticipatedActivitiesView,
                options:{ headerTitle: translate("menu_activities_participated") }
            },
            {
                name:"FavoriteActivities",
                component:FavoriteActivitiesView,
                options:{ headerTitle: translate("menu_activities_favorites") }
            }
        ]}/>
    );
};

export default ActivityStackNavigator;
