import React, { useContext } from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { getResponsiveSize } from '../../utils/font/font';
import { useActivityListItemStyle } from './ActivityListItem.style';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../navigation/Navigation.config';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { IActivity, IForeignActivity } from '../../models/Activity';
import Avatar from '../Avatar/Avatar';
import InfoWithIcon from '../InfoWithIcon/InfoWithIcon';
import { useLocalDate } from '../../hooks/useLocalDate';
const defaultImg = require('../../../assets/img/defaultActivityImg.png');

function ActivityListItem(activity: IActivity | IForeignActivity) {

    const { styles } = useActivityListItemStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { setActivity, fetchUserProfile, user } = useContext(SessionContext);
    const { getTimeRange, getLocalDateRange } = useLocalDate();

    const isOwnActivity = activity.userId === user.id;

    const memberCount = (
        activity.memberUserIds.length +
        (activity.maxMember ? '/' + activity.maxMember : '') +
        ' ' + translations.member
    );

    const applicantCount = isOwnActivity && activity.applicantUserIds.length > 0
        ? activity.applicantUserIds.length + ' ' + translations.applicants
        : undefined;

    const imageSource = activity.image
        ? { uri: 'data:image/gif;base64,' + activity.image.base64 }
        : defaultImg;

    const handleItemPressed = () => {
        setActivity(activity);
        navigation.navigate(RouteName.Activity.Info);
    };

    const handleAvatarPressed = () => {
        fetchUserProfile(activity.userId);
        navigation.navigate(RouteName.Profile.OtherTab);
    };

    return (
        <TouchableRipple style={styles.root} onPress={handleItemPressed}>
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    {!isOwnActivity && (
                        <Avatar
                            username={(activity as IForeignActivity).username}
                            base64={(activity as IForeignActivity).avatar?.base64}
                            onPress={handleAvatarPressed}
                        />
                    )}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: getResponsiveSize(15)
                        }}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={imageSource} style={styles.image} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text numberOfLines={1} style={styles.titleText}>
                                {activity.title}
                            </Text>
                            <InfoWithIcon icon="pin" text={activity.location} />
                            <InfoWithIcon
                                icon="calendar"
                                text={
                                    getLocalDateRange(
                                        activity.startDate,
                                        activity.endDate
                                    )
                                }
                            />
                            <InfoWithIcon
                                icon="clock"
                                text={getTimeRange(activity.startTime, activity.endTime)}
                            />
                            <InfoWithIcon
                                icon="account-group"
                                text={memberCount}
                                redText={isOwnActivity ? applicantCount : undefined}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableRipple>
    );
};

export default ActivityListItem;
