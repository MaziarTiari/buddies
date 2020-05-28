import React, { useState, useContext } from "react";
import Container from "../Container/Container";
import { IActivity, activities } from "../../dev/example_data/fetchedActivityList";
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";
import useStyle from "./ActivityList.style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import Toast from "react-native-simple-toast";

// TODO : Add Translations

const ActivityList = () => {
    const { theme } = useContext(ThemeContext);
    const style = useStyle();

    const [allActivities, setAllActivities] = useState<IActivity[]>(activities);

    let rightOpen: boolean, leftOpen: boolean, currentId: string;

    const hideActivity = (id: string) => {
        setAllActivities((activities) =>
            activities.filter((activity) => activity.id !== id)
        );
        Toast.show("Activity hidden.", Toast.SHORT);
        // TODO : Send hide to API
    };

    const applyActivity = (id: string) => {
        // TODO : Send apply to API and check if user already applied
        Toast.show("Application sent.", Toast.SHORT);
    };

    const handleTouchEnd = () => {
        if (currentId) {
            if (rightOpen) hideActivity(currentId);
            if (leftOpen) applyActivity(currentId);
        }
    };

    const handleRightActionStatusChange = (key: string, isActivated: boolean) => {
        currentId = key;
        rightOpen = isActivated;
    };

    const handleLeftActionStatusChange = (key: string, isActivated: boolean) => {
        currentId = key;
        leftOpen = isActivated;
    };

    const renderBackground = (activity: IActivity) => {
        return (
            <View style={style.backgroundContainer}>
                <View style={style.backgroundSideContainer}>
                    <MaterialCommunityIcons
                        name="account-plus"
                        color={theme.App.primaryText}
                        size={getResponsiveSize(30)}
                    />
                    <Text style={style.text}>Apply</Text>
                </View>
                <View style={style.backgroundSideContainer}>
                    <MaterialCommunityIcons
                        name="eye-off"
                        color={theme.App.primaryText}
                        size={getResponsiveSize(30)}
                    />
                    <Text style={style.text}>Hide</Text>
                </View>
            </View>
        );
    };

    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <SwipeListView
                    data={allActivities}
                    renderItem={({ item }) => <ActivityListItem {...item} />}
                    keyExtractor={(item) => item.id}
                    renderHiddenItem={({ item }) => renderBackground(item)}
                    onLeftActionStatusChange={({ key, isActivated }) =>
                        handleLeftActionStatusChange(key, isActivated)
                    }
                    onRightActionStatusChange={({ key, isActivated }) =>
                        handleRightActionStatusChange(key, isActivated)
                    }
                    leftActivationValue={getResponsiveSize(140)}
                    rightActivationValue={getResponsiveSize(-140)}
                    leftActionValue={0}
                    rightActionValue={0}
                    onTouchEnd={handleTouchEnd}
                />
            </Container>
        </Container>
    );
};

export default ActivityList;
