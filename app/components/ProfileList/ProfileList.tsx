import React, { useContext } from "react";
import { FlatList } from "react-native";
import Container from "../Container/Container";
import { IUserAvatar } from "../../models/UserAvatar";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

export interface ProfileListProps {
    getAvatarsRightComponent?: (avatar: IUserAvatar) => JSX.Element;
}

export default function ProfileList() {
    const navigation = useNavigation();
    const route = useRoute();
    const { theme } = useContext(ThemeContext);
    const { avatarList } = useContext(SessionContext);
    const props = route.params as ProfileListProps;

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
                        />
                    )}
                    keyExtractor={(avatar) => avatar.userId}
                />
            </Container>
        </Container>
    );
};