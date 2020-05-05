import React from "react";
import { Button } from "react-native";
import Container from "../Container/Container";

const ProfileAbout = ({ navigation }: any) => {
    return (
        <Container type="screen" layout="root">
            <Button title="Friends" onPress={() => navigation.navigate("FriendList")} />
        </Container>
    );
};

export default ProfileAbout;
