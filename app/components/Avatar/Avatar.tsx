import React from "react";
import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import useStyle from "./Avatar.style";

const defaultImage = require("../../../assets/img/defaultProfileImage.png");

interface AvatarProps {
    username: string;
    base64?: string;
    onPress?: () => void;
}

const Avatar = (Props: AvatarProps): JSX.Element => {
    const style = useStyle();
    const { username, base64, onPress } = Props;
    const imageSource = base64 ? { uri: "data:image/gif;base64," + base64 } : defaultImage;

    return (
        <View style={style.container}>
            <Image style={style.image} source={imageSource} />
            <TouchableWithoutFeedback onPress={onPress}>
                <Text style={style.text}>{username}</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Avatar;