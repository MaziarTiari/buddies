import React, { useState, useContext } from 'react';
import { FlatList, View } from 'react-native';
import Container from '../Container/Container';
import { IUserAvatar } from '../../models/UserAvatar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProfileListItem } from '../ProfileListItem/ProfileListItem';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { IconButton } from 'react-native-paper';
import { IAvatarBgColor } from '../../context/SessionContext/sessionContextModel';
import { IActivity } from '../../models/Activity';
import { ActivityContext } from '../../context/ActivityContext/ActivityContext';
import EditApproval from '../EditApproval/EditApproval';
import { RouteName } from '../../navigation/Navigation.config';
import useAppNavigation from '../../hooks/useAppNavigation';
import { AxiosError } from 'axios';
import { useActivityClient } from '../../api/activityClient';

export interface ApplicantListProps {
    activity: IActivity;
}

export default function ApplicantList() {
    
    const {navigation} = useAppNavigation();
    const route = useRoute();
    const { theme, themeType } = useContext(ThemeContext);
    
    const { 
        avatarList,
        token, 
        authenticate,
        setAvatarList, 
        setIsLoading,
        fetchUserProfile,
        setErrorMessage,
    } = useContext(SessionContext);

    const activityClient = useActivityClient(token, authenticate);
    const { updateOwnActivity } = useContext(ActivityContext);
    const [avatarBgColors, setAvatarBgColors] = useState<IAvatarBgColor[]>([]);
    const [acceptedApplicants, setAcceptedApplicants] = useState<string[]>([]);
    const [rejectedApplicants, setRejectedApplicants] = useState<string[]>([]);

    const props = route.params as ApplicantListProps;

    function handleCancel() {
        navigation.goBack();
        setAvatarList([]);
        setAvatarBgColors([]);
    }

    function handleOnAvatarPress(userId: string) {
        fetchUserProfile(userId)
            .then( userProfile => {
                navigation.navigate(RouteName.Profile.OtherTab);
            });
    }

    async function handleSubmit() {
        let updatedActivity = { ...props.activity };
        setIsLoading(true);
        if (rejectedApplicants.length > 0) {
            await activityClient
                .rejectAcpplications(props.activity.id, rejectedApplicants)
                .then(() => {
                    updatedActivity
                        .applicantUserIds = updatedActivity.applicantUserIds.filter(
                            (id) => !rejectedApplicants.includes(id)
                    );
                })
                .catch((err) => console.error(err));
        }
        if (acceptedApplicants.length > 0) {
            await activityClient
                .acceptApplications(props.activity.id, acceptedApplicants)
                .then(() => {
                    updatedActivity
                        .applicantUserIds = updatedActivity.applicantUserIds.filter(
                            (id) => !acceptedApplicants.includes(id)
                    );
                    updatedActivity.memberUserIds = [
                        ...updatedActivity.memberUserIds,
                        ...acceptedApplicants
                    ];
                })
                .catch((err: AxiosError) => setErrorMessage(err.message));
        }
        updateOwnActivity(updatedActivity);
        handleCancel();
        setIsLoading(false);
    }

    function setNewAvatarColor(userId: string, color: string) {
        let avatarBgColor = avatarBgColors.find((a) => a.userId === userId);
        let newBgColors = [...avatarBgColors];
        if (avatarBgColor) {
            avatarBgColor.color = color;
            const index = newBgColors.findIndex((a) => a.userId === userId);
            newBgColors[index] = avatarBgColor;
        } else {
            avatarBgColor = { userId: userId, color: color };
            newBgColors.push(avatarBgColor);
        }
        setAvatarBgColors(newBgColors);
    }

    const renderAvatarRightComponent = (avatar: IUserAvatar) => (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton
                color={theme.App.secondaryRejectColor}
                size={30}
                style={{ marginRight: 4 }}
                icon="emoticon-sad"
                onPress={() => {
                    setRejectedApplicants([
                        ...rejectedApplicants,
                        avatar.userId
                    ]);
                    setNewAvatarColor(
                        avatar.userId,
                        themeType === "dark" ? theme.App.rejectBackground : "#BB4C4C"
                    );
                }}
            />
            <IconButton
                color={theme.App.secondaryAcceptColor}
                size={30}
                style={{ marginRight: 4 }}
                icon="emoticon-happy"
                onPress={() => {
                    setAcceptedApplicants([
                        ...acceptedApplicants,
                        avatar.userId
                    ]);
                    setNewAvatarColor(
                        avatar.userId,
                        themeType === "dark" ? theme.App.acceptBackground : "#7CD39A"
                    );
                }}
            />
        </View>
    );

    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <FlatList
                    data={avatarList}
                    renderItem={({ item: avatar }) => (
                        <ProfileListItem
                            userId={avatar.userId}
                            isOnline={false}
                            subTitle={avatar.username}
                            title={avatar.firstname + ' ' + avatar.lastname}
                            rightComponent={renderAvatarRightComponent(avatar)}
                            backgroundColor={
                                avatarBgColors.find(
                                    (a) => a.userId === avatar.userId
                                )?.color
                            }
                            onPress={() => { handleOnAvatarPress(avatar.userId)}}
                        />
                    )}
                    keyExtractor={(avatar) => avatar.userId}
                />
                <EditApproval
                    cancelIconName="close"
                    submitIconName="check"
                    onCancel={handleCancel}
                    onSubmit={() => {
                        handleSubmit();
                    }}
                />
            </Container>
        </Container>
    );
}
