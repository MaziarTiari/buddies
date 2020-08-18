import React, { useContext } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { RouteName } from "../../navigation/Navigation.config";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const ActivityHeader = () => {

    const navigation = useNavigation();
    const theme = useContext(ThemeContext).theme;

    return (
        <View style={{ flexDirection: "row" }}>
            <IconButton
                color={theme.App.contentBasicButton}
                icon="heart"
                onPress={() => navigation.navigate(RouteName.Activity.MyFavorite)}
            />
            <IconButton
                color={theme.App.contentBasicButton}
                icon="wunderlist"
                onPress={() => navigation.navigate(RouteName.Activity.MyList)}
            />
        </View>
    );
}

export default ActivityHeader;
