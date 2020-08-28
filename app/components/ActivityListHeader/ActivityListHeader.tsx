import React, { useContext } from "react";
import { RouteName } from "../../navigation/Navigation.config";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import BadgedIcon from "../BadgedIcon/BadgedIcon";
import { getResponsiveSize } from "../../utils/font/font";
import { ActivityContext } from "../../context/ActivityContext/ActivityContext";

const ActivityListHeader = () => {

    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const { unhandledApplications } = useContext(ActivityContext);

    return (
        <BadgedIcon
            color={theme.App.interactiveItem}
            icon="store"
            size={getResponsiveSize(30)}
            onPress={() => navigation.navigate(RouteName.Activity.OwnList)}
            value={unhandledApplications}
        />
    );
}

export default ActivityListHeader;
