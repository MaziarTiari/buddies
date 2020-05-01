import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import Color from "../../utils/theme/color";
import { RouteName } from "../../utils/navigation/configuration";

const ActivityHeader = ({ navigation }: any) => (
    <View style={{ flexDirection: "row" }}>
        <IconButton
            color={Color.basicButton}
            icon="heart"
            onPress={() => navigation.navigate(RouteName.Activity.MyFavorite)}
        />
        <IconButton
            color={Color.basicButton}
            icon="wunderlist"
            onPress={() => navigation.navigate(RouteName.Activity.MyList)}
        />
    </View>
);

export default ActivityHeader;
