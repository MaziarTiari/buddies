import React, { useContext } from "react";
import { View, Image, Text, GestureResponderEvent } from "react-native";
import { IActivity } from "../../dev/example_data/fetchedActivityList";
import { IconButton, Headline, TouchableRipple } from "react-native-paper";
import { fontsizes } from "../../utils/font/font";
import { users } from "../../dev/example_data/users";
import { IUserProfile } from "../../models/UserProfile";
import { useStyle } from "./ActivityListItem.style";
import Container from "../Container/Container";
import { useNavigation } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { getDateRangeString } from "../../utils/date";
import { SessionContext } from "../../context/SessionContext/SessionContext";

const defaultImg = require("../../../assets/img/default-activity-img.jpg");

const ActivityListItem = (Props: IActivity) => {
    const { styles, theme } = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { setActivity } = useContext(SessionContext);

    const owner = users.find((user) => user.id === Props.ownerUserId) as IUserProfile;
    const ownerName = owner.firstname + " " + owner.lastname;
    const participatesCount = Props.memberUserIds?.length + (Props.maxApplications ? "/" + Props.maxApplications : "");
    const titleContent = Props.title;
    const imageSource = getImageSource(Props.imageName);
    const dateString = getDateRangeString(Props.startDate, translations.dateRangePreposition, Props.endDate)

    const onPress = () => {
        setActivity(Props);
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

/*
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
*/

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
