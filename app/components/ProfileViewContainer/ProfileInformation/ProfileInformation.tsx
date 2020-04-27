import React from "react";
import AppScreen from "../../AppScreen/AppScreen";
import { Button } from "react-native";

const ProfileInformation = ({navigation}: any) => {
    return (
        <AppScreen>
            <Button 
                title="Friends" onPress={() => navigation.navigate('FriendListContainer')}
            />
        </AppScreen>
    );
};


export default ProfileInformation;
