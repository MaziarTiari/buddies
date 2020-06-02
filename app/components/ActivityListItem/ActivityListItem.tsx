import React from "react";
import { View, Image, Text, GestureResponderEvent } from "react-native";
import { IActivity } from "../../dev/example_data/fetchedActivityList";
import { IconButton, Headline, TouchableRipple } from "react-native-paper";
import { fontsizes } from "../../utils/font/font";
import { users } from "../../dev/example_data/users";
import { IUserProfile } from "../../models/User";
import { useStyle } from "./ActivityListItem.style";
import Container from "../Container/Container";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";
const defaultImg = require("../../../assets/img/default-activity-img.jpg");

const ActivityListItem = (Props: IActivity) => {
    const { styles, theme } = useStyle();
    const navigation = useNavigation();

    const owner = users.find((user) => user.id === Props.ownerUserId) as IUserProfile;
    const ownerName = owner.firstname + " " + owner.lastname;
    const participatesCount =
        Props.membersUserIds?.length + "/" + Props.allowedApplyNumber;
    const titleContent = Props.title;
    const imageSource = getImageSource(Props.imageName);
    const dateScale = getDateScale(Props.startDate, Props.endDate);
    const timeScale = getTimeScale(Props.startTime, Props.endTime);

    const onPress = () => { navigation.dispatch(CommonActions.navigate({ name: RouteName.Activity.Info, params: Props})) };
    const onParticipates = () => {};
    const onChat = (event?: GestureResponderEvent) => {};
    const onFavorite = () => {};

    return (
        <TouchableRipple style={styles.root} onPress={onPress}>
            <Container type="component" layout="root" style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContainer}>
                        <IconButton
                            icon="chat"
                            color={theme.App.basicItem}
                            size={fontsizes.icon}
                            style={styles.icon}
                            onPress={onChat}
                        />
                        <Text style={styles.iconText}>{ownerName}</Text>
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.iconText}>{participatesCount}</Text>
                        <IconButton
                            icon="account-group"
                            color={theme.App.basicItem}
                            size={fontsizes.icon}
                            onPress={onParticipates}
                            style={styles.icon}
                        />
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <Image style={styles.image} source={imageSource} />
                    <View style={styles.infoContainer}>
                        <Headline numberOfLines={2} style={styles.title}>
                            {titleContent}
                        </Headline>
                        <View style={styles.bodyContainer}>
                            <View>
                                <Text
                                    numberOfLines={2}
                                    style={[styles.info, styles.address]}
                                >
                                    {Props.location}
                                </Text>
                                {(Props.startDate || Props.endDate) && (
                                    <Text style={styles.info}>{dateScale}</Text>
                                )}
                                {(Props.startTime || Props.endTime) && (
                                    <Text style={styles.info}>{timeScale}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
                <IconButton
                    icon="star-outline"
                    color={theme.App.basicItem}
                    onPress={onFavorite}
                    size={fontsizes.icon}
                    style={[styles.icon, styles.favoriteIcon]}
                />
            </Container>
        </TouchableRipple>
    );
};

const getDateScale = (startDate?: Date, endDate?: Date) => {
    const start = startDate?.toLocaleDateString();
    const end = endDate?.toLocaleDateString();
    if (start === end || !end) return start;
    return start + " - " + end;
};

const getTimeScale = (startTime?: Date, endTime?: Date) => {
    const start = startTime?.toLocaleTimeString();
    const end = endTime?.toLocaleTimeString();
    if (start === end || !end) return start;
    return start + " - " + end;
};

const getImageSource = (title: string) => {
    switch (title) {
        case "meditation.jpg":
            return require("../../../assets/img/meditation.jpg");
        case "mountain-bike.jpg":
            return require("../../../assets/img/mountain-bike.jpg");
        default:
            return defaultImg;
    }
};

export default ActivityListItem;
