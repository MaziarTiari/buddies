import React, { useContext } from "react";
import { View, Image, Text, GestureResponderEvent } from "react-native";
import { IconButton, Headline, TouchableRipple } from "react-native-paper";
import { fontsizes } from "../../utils/font/font";
import { useStyle } from "./ActivityListItem.style";
import Container from "../Container/Container";
import { useNavigation } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { getDateRangeString } from "../../utils/date";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { IActivity } from "../../models/Activity";

const defaultImg = require("../../../assets/img/default-activity-img.jpg");

const ActivityListItem = (activity: IActivity) => {
    const { styles, theme } = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { setActivity } = useContext(SessionContext);

    // const owner = users.find((user) => user.id === activity.userId)!;
    // const ownerName = owner.firstname + " " + owner.lastname;
    const ownerName = "OwnerName"; // TODO Get From UserAvatar
    const memberCount = activity.memberUserIds.length + (activity.maxMember ? "/" + activity.maxMember : "");
    const dateString = getDateRangeString(activity.startDate, translations.dateRangePreposition, activity.endDate);
    const imageSource = activity.image ? { uri: "data:image/gif;base64," + activity.image.base64 } : defaultImg;

    const onPress = () => {
        setActivity(activity);
        navigation.navigate(RouteName.Activity.Info)
    };

    const onParticipates = () => { };
    const onChat = (event?: GestureResponderEvent) => { };
    const onFavorite = () => { };

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
                        <Text style={styles.iconText}>{memberCount}</Text>
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
                        <Headline numberOfLines={2} style={styles.title}>{activity.title}</Headline>
                        <View style={styles.bodyContainer}>
                            <View>
                                <Text
                                    numberOfLines={2}
                                    style={[styles.info, styles.address]}
                                >
                                    {activity.location}
                                </Text>
                                <Text style={styles.info}>{dateString}</Text>
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

export default ActivityListItem;
