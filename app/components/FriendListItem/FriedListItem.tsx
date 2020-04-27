import React from "react";
import { IconButton } from "react-native-paper";
import { ProfileListItem } from "../ProfileListItem/ProfileListItem";
import { IProfile } from "../../../example_data/FetchedProfile";

export const FriedListItem = (Props: IProfile) => {
    
    const rightComponent = (
        <IconButton style={{alignSelf: "center"}} icon="dots-horizontal" 
                    onPress={() => alert("friend option")}/>
    );

    const subTitle = "" + Props.firstname + Props.lastname;
    
    return (
        <ProfileListItem 
            uuid={Props.id.toString()} isOnline={false} rightComponent={rightComponent}
            title={Props.username} subTitle={subTitle}
            onPress={() => {}}
        />
    );
};