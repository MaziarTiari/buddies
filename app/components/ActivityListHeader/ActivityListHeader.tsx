import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import { RouteName } from "../../navigation/Navigation.config";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { withBadge } from "react-native-elements";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";

const ActivityListHeader = () => {

    const navigation = useNavigation();
    const theme = useContext(ThemeContext).theme;

    const BadgedIcon = 3 ? withBadge(3, { badgeStyle: { top: -5, right: 5 } })(MaterialCommunityIcons) : MaterialCommunityIcons;

    return (
        <TouchableRippleCircle onPress={() => navigation.navigate(RouteName.Activity.OwnList)}>
            <BadgedIcon
                color={theme.App.basicItem}
                name="wunderlist"
                size={26}
            />
        </TouchableRippleCircle>
    );
}

export default ActivityListHeader;
