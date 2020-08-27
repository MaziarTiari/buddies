import React, { useState } from "react";
import { FlatList } from "react-native";
import { users } from "../../dev/example_data/users";
import Container from "../Container/Container";
import { IUserAvatar } from "../../models/UserAvatar";
import { useRoute } from "@react-navigation/native";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { Item } from "react-native-paper/lib/typescript/src/components/List/List";

export interface ProfileListProps {
    avatars: Array<IUserAvatar>;
    getAvatarsRightComponent: (avatar: IUserAvatar) => JSX.Element;
}

export default function ProfileList() {
    const route = useRoute();
    const props = route.params as ProfileListProps;

    return (
        <Container type="screen" layout="root">
            <Container type='screen' layout='body'>
                <FlatList
                    data={props.avatars}
                    renderItem={({ item: avatar }) => (
                        <ProfileListItem 
                            id={avatar.userId}
                            isOnline={false}
                            subTitle={avatar.username}
                            title={avatar.firstname + " " + avatar.lastname}
                            rightComponent={props.getAvatarsRightComponent(avatar)}
                        />
                    )}
                    keyExtractor={(avatar) => avatar.userId}
                />
            </Container>
        </Container>
    );
};