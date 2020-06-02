import React, { useContext } from "react";
import { View, Text } from "react-native";
import useStyle from "./ActivityInfo.style";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { IActivity } from "../../dev/example_data/fetchedActivityList";
import Container from "../Container/Container";
import { useNavigation, useRoute } from "@react-navigation/native";

const ActivityInfo = () => {
    const style = useStyle();
    const navigation = useNavigation();
    const route = useRoute();
    const { translations } = useContext(LanguageContext);
    const activity = route.params as IActivity;

    // TODO : Find a fix for a correct title lenght on every device
    navigation.setOptions({
        title:
            activity.title.substr(0, 20) +
            "... (" +
            activity.membersUserIds?.length +
            "/" +
            activity.allowedApplyNumber +
            ")",
    });

    

    return (
        <Container layout="root" type="screen">
            <Text></Text>
        </Container>
    );
};

export default ActivityInfo;
