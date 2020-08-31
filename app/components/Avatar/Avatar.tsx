import React from "react";
import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import useAvatarStyle from "./Avatar.style";

const defaultImage = require("../../../assets/img/defaultProfileImage.png");

interface AvatarProps {
    username: string;
    base64?: string;
    onPress?: () => void;
}

const Avatar = (Props: AvatarProps): JSX.Element => {
    const styles = useAvatarStyle();
    const { username, base64, onPress } = Props;
    const imageSource = base64 
        ? { uri: "data:image/gif;base64," + base64 } : defaultImage;

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={imageSource} />
            <TouchableWithoutFeedback onPress={onPress}>
                <Text style={styles.text}>{username}</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Avatar;