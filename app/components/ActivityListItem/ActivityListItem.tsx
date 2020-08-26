import React, { useContext } from "react";
import { View, Image, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { fontsizes, getLineHeight, getResponsiveSize } from "../../utils/font/font";
import { useStyle } from "./ActivityListItem.style";
import { useNavigation } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { getDateDiffString } from "../../utils/date";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { IActivity, IForeignActivity } from "../../models/Activity";
import Avatar from "../Avatar/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

const defaultImg = require("../../../assets/img/default-activity-img.jpg");

const ActivityListItem = (activity: IActivity | IForeignActivity) => {
    const { styles, theme } = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { setActivity, fetchUserProfile, user } = useContext(SessionContext);

    const isOwnActivity = activity.userId === user.id;
    const memberCount = activity.memberUserIds.length + (activity.maxMember ? "/" + activity.maxMember : "") + " " + translations.member;
    const imageSource = activity.image ? { uri: "data:image/gif;base64," + activity.image.base64 } : defaultImg;

    const handleItemPressed = () => {
        setActivity(activity);
        navigation.navigate(RouteName.Activity.Info)
    };

    const handleAvatarPressed = () => {
        fetchUserProfile(activity.userId);
        navigation.navigate(RouteName.Profile.OtherTab);
    };

    const InfoWithIcon = (icon: string, text: string) => {
        return (
            <View style={styles.infoIconContainer}>
                <MaterialCommunityIcons name={icon} size={getLineHeight(fontsizes.small)} color={theme.App.primaryText} />
                <Text style={styles.infoText} numberOfLines={1}>{text}</Text>
            </View>
        );
    };
    return (
        <TouchableRipple style={styles.root} onPress={handleItemPressed}>
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    {!isOwnActivity &&
                        <Avatar
                            username={(activity as IForeignActivity).username}
                            base64={(activity as IForeignActivity).image?.base64}
                            onPress={handleAvatarPressed}
                        />
                    }
                    <View style={{ flexDirection: "row", marginTop: getResponsiveSize(15) }}>
                        <View style={styles.imageContainer} >
                            <Image source={imageSource} style={styles.image} />
                        </View>
                        <View style={styles.infoContainer} >
                            <Text numberOfLines={1} style={styles.titleText}>{activity.title}</Text>
                            {InfoWithIcon("pin", activity.location)}
                            {activity.startDate !== undefined &&
                                InfoWithIcon("calendar", moment.unix(activity.startDate).format("LLL"))}
                            {activity.startDate !== undefined && activity.endDate !== undefined &&
                                InfoWithIcon("clock", getDateDiffString(activity.startDate, activity.endDate))}
                            {InfoWithIcon("account-group", memberCount)}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableRipple>
    );
};

export default ActivityListItem;
