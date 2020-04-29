import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import Color from "../../utils/theme/color";
import { RouteName } from "../../../App";

const ActivityHeader = ({ navigation }: any) => (
    <View style={{ flexDirection: "row" }}>
        <IconButton
            color={Color.secondaryText}
            icon="heart"
            onPress={() => navigation.navigate(RouteName.Activity.MyFavorite)}
        />
        <IconButton
            color={Color.secondaryText}
            icon="wunderlist"
            onPress={() => navigation.navigate(RouteName.Activity.MyList)}
        />
    </View>
);

export default ActivityHeader;
