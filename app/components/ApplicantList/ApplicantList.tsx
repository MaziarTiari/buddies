import React, { useState, useContext } from "react";
import { FlatList, View } from "react-native";
import Container from "../Container/Container";
import { IUserAvatar } from "../../models/UserAvatar";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { IconButton } from "react-native-paper";
import { IAvatarBgColor } from "../../context/SessionContext/stateFrame";
import { IActivity } from "../../models/Activity";
import { activityApi } from "../../api/ApiClient";
import { ActivityContext } from "../../context/ActivityContext/ActivityContext";

export interface ApplicantListProps {
    activity: IActivity;
}

export default function ApplicantList() {
    const navigation = useNavigation();
    const route = useRoute();
    const { theme } = useContext(ThemeContext);
    const { avatarList, setAvatarList, setIsLoading, isLoading } = useContext(SessionContext);
    const { updateOwnActivity } = useContext(ActivityContext);
    const [avatarBgColors, setAvatarBgColors] = useState<IAvatarBgColor[]>([])
    const [acceptedApplicants, setAcceptedApplicants] = useState<string[]>([]);
    const [rejectedApplicants, setRejectedApplicants] = useState<string[]>([])

    const props = route.params as ApplicantListProps;

    async function handleCancel() {
        if (!isLoading) {
            setIsLoading(true);
        }
        navigation.goBack();
        setAvatarList([]);
        setAvatarBgColors([]);
        setIsLoading(false);
    }

    async function handleSubmit() {
        let updatedActivity = { ...props.activity };
        setIsLoading(true);
        if (rejectedApplicants.length > 0) {
            await activityApi.Post("reject/" + props.activity.id, rejectedApplicants)
                .then(() => {
                    updatedActivity.applicantUserIds = updatedActivity.applicantUserIds
                        .filter(id => rejectedApplicants.includes(id));
                })
                .catch(err => console.error(err)) // TODO
        }
        if (acceptedApplicants.length > 0) {
            await activityApi.Post("accept/" + props.activity.id, acceptedApplicants)
                .then(() => {
                    updatedActivity.applicantUserIds = updatedActivity.applicantUserIds
                        .filter(id => acceptedApplicants.includes(id));
                    updatedActivity.memberUserIds = [
                        ...updatedActivity.memberUserIds,
                        ...acceptedApplicants
                    ]
                })
                .catch(err => console.error(err)) // TODO
        }
        updateOwnActivity(updatedActivity);
        handleCancel();
    }

    function setNewAvatarColor(userId: string, color: string) {
        let avatarBgColor = avatarBgColors.find(a => a.userId === userId);
        let newBgColors = [...avatarBgColors];
        if (avatarBgColor) {
            avatarBgColor.color = color;
            const index = newBgColors.findIndex(a => a.userId === userId);
            newBgColors[index] = avatarBgColor;
        } else {
            avatarBgColor = { userId: userId, color: color };
            newBgColors.push(avatarBgColor);
        }
        setAvatarBgColors(newBgColors);
    }

    const renderAvatarRightComponent = (avatar: IUserAvatar) => (
        <View style={{display: "flex", flexDirection: "row"}}>
            <IconButton
                color={theme.App.secondaryRejectColor}
                size={30}
                style={{marginRight: 4}}
                icon="emoticon-sad" 
                onPress={() => {
                    setRejectedApplicants([
                        ...rejectedApplicants, avatar.userId
                    ]);
                    setNewAvatarColor(avatar.userId, "#560019");
                }}
            />
            <IconButton
                color={theme.App.secondaryAcceptColor}
                size={30}
                style={{marginRight: 4}}
                icon="emoticon-happy" 
                onPress={() => {
                    setAcceptedApplicants([
                        ...acceptedApplicants, avatar.userId
                    ]);
                    setNewAvatarColor(avatar.userId, "#013B24");
                }}
            />
        </View>
    )

    return (
        <Container type="screen" layout="root">
            <Container type='screen' layout='body'>
                <FlatList
                    data={avatarList}
                    renderItem={({ item: avatar }) => (
                        <ProfileListItem 
                            userId={avatar.userId}
                            isOnline={false}
                            subTitle={avatar.username}
                            title={avatar.firstname + " " + avatar.lastname}
                            rightComponent={renderAvatarRightComponent(avatar)}
                            backgroundColor={avatarBgColors
                                .find(a => a.userId === avatar.userId)?.color
                            }
                        />
                    )}
                    keyExtractor={(avatar) => avatar.userId}
                />
                <View 
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        backgroundColor: theme.App.layoutBackground,
                        minHeight: "12%",
                        maxHeight: 120,
                    }}
                >
                    <IconButton 
                        icon="close"
                        size={60}
                        onPress={() => { handleCancel()} }
                        color={theme.App.rejectColor}
                    />
                    <IconButton 
                        icon="check"
                        size={60}
                        onPress={() => { handleSubmit()} }
                        color={theme.App.acceptColor}
                    />
                </View>
            </Container>
        </Container>
    );
};