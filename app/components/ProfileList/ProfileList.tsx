import React, { useContext } from "react";
import { FlatList } from "react-native";
import Container from "../Container/Container";
import { IUserAvatar } from "../../models/UserAvatar";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { RouteName } from "../../navigation/Navigation.config";

export interface ProfileListProps {
    getAvatarsRightComponent?: (avatar: IUserAvatar) => JSX.Element;
}

export default function ProfileList() {
    const navigation = useNavigation();
    const route = useRoute();
    const { avatarList, fetchUserProfile } = useContext(SessionContext);
    const props = route.params as ProfileListProps;

    function handleOnAvatarPress(userId: string) {
        fetchUserProfile(userId)
            .then( userProfile => {
                navigation.navigate(RouteName.Profile.OtherTab);
            });
    }

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
                            rightComponent={props.getAvatarsRightComponent?.(avatar)}
                            onPress={() => handleOnAvatarPress(avatar.userId)}
                        />
                    )}
                    keyExtractor={(avatar) => avatar.userId}
                />
            </Container>
        </Container>
    );
};