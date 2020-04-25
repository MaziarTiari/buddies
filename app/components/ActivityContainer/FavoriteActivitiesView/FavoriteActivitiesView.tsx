import React from "react";
import { Text } from "react-native";
import AppScreen from "../../AppScreen/AppScreen";
import Color from "../../../utils/theme/color";

const FavoriteActivitiesView = () => {
    return (
        <AppScreen>
            <Text style={{color: Color.secondaryText}}>Favorite Activities Screen</Text>
        </AppScreen>
    );
};

export default FavoriteActivitiesView;
