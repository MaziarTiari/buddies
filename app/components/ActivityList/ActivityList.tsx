import React, { useContext, useEffect, useMemo } from "react";
import Container from "../Container/Container";
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text } from "react-native";
import { getResponsiveSize } from "../../utils/font/font";
import useStyle from "./ActivityList.style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import Toast from "react-native-simple-toast";
import { IActivity, IActivityRequest } from "../../models/Activity";
import ActionButton from "../ActionButton/ActionButton";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ActivityContext } from "../../context/ActivityContext/ActivityContext";
import { defaultActivity } from "../../context/SessionContext/stateFrame";

const ActivityList = () => {
    const navigation = useNavigation();
    const { name: routeName } = useRoute();
    const style = useStyle();
    const { theme } = useContext(ThemeContext);
    const { translations } = useContext(LanguageContext);
    const { startEditingActivity, setActivity, user } = useContext(SessionContext);
    const activityContext = useContext(ActivityContext);

    const showOwnActivities = routeName === RouteName.Activity.OwnList;

    const { activities, isLoading, fetchActivities } = useMemo(() => showOwnActivities
        ? {
            activities: activityContext.ownActivities,
            isLoading: activityContext.isLoadingOwn,
            fetchActivities: activityContext.fetchOwnActivities
        }
        : {
            activities: activityContext.foreignActivities,
            isLoading: activityContext.isLoadingForeign,
            fetchActivities: activityContext.fetchForeignActivities
        }
        , [activityContext.foreignActivities, activityContext.fetchOwnActivities, showOwnActivities])

    useEffect(() => {
        if (showOwnActivities)
            navigation.setOptions({ title: translations.my_activities })
    }, [navigation, showOwnActivities, translations])

    let rightOpen: boolean, leftOpen: boolean, currentId: string;

    const hideActivity = (id: string) => {
        activityContext.hideActivity(id);
        Toast.show("Activity hidden.", Toast.SHORT); // TODO Translation
    };

    const applyActivity = (id: string) => {
        activityContext.applyToActivity(id);
        Toast.show("Application sent.", Toast.SHORT); // TODO Translation
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
                        name="hand"
                        color={theme.App.acceptColor}
                        size={getResponsiveSize(50)}
                    />
                    <Text style={style.text}>{translations.apply}</Text>
                </View>
                <View style={style.backgroundSideContainer}>
                    <MaterialCommunityIcons
                        name="eye-off"
                        color={theme.App.rejectColor}
                        size={getResponsiveSize(50)}
                    />
                    <Text style={style.text}>{translations.hide}</Text>
                </View>
            </View>
        );
    };

    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <SwipeListView
                    data={activities}
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
                    refreshing={isLoading}
                    onRefresh={fetchActivities}
                    disableLeftSwipe={showOwnActivities}
                    disableRightSwipe={showOwnActivities}
                />
                {showOwnActivities &&
                    <ActionButton icon="plus" onPress={() => {
                        setActivity({ ...defaultActivity , userId: user.id });
                        startEditingActivity();
                        navigation.navigate(RouteName.Activity.Info);
                    }} />
                }
            </Container>
        </Container>
    );
};

export default ActivityList;
