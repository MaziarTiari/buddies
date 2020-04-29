import React from "react";
import { Button } from "react-native";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";

const ProfileAbout = ({ navigation }: any) => {
    return (
        <ScreenContentContainer>
            <Button title="Friends" onPress={() => navigation.navigate("FriendList")} />
        </ScreenContentContainer>
    );
};

export default ProfileAbout;
