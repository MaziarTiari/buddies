import React from "react";
import { IconButton } from "react-native-paper";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { IUserProfile } from "../../models/UserProfile";

export const FriedListItem = (Props: IUserProfile) => {
    const rightComponent = (
        <IconButton
            style={{ alignSelf: "center" }}
            icon="dots-horizontal"
            onPress={() => alert("friend option")}
        />
    );

    const subTitle = "" + Props.firstname + " " + Props.lastname;

    return (
        <ProfileListItem
            uuid={Props.id.toString()}
            isOnline={false}
            rightComponent={rightComponent}
            title={subTitle}
            subTitle={Props.username}
            onPress={() => {}}
        />
    );
};
