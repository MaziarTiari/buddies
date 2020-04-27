import React from "react";
import { Button } from "react-native";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";
import { navigationComponentNames } from "../Navigation/componentNames";

const UserProfile = ({ navigation }: any) => {
    return (
        <ScreenContentContainer>
            <Button
                title="Friends"
                onPress={() =>
                    navigation.navigate(navigationComponentNames.FriendListContainer)
                }
            />
        </ScreenContentContainer>
    );
};

export default UserProfile;
