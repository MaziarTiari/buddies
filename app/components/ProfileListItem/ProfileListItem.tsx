import React from "react";
import { View, Text, Image, GestureResponderEvent } from "react-native";
import styles from "./ProfileListItem.style";
import { TouchableRipple } from "react-native-paper";

export interface ProfileListItemProps {
    uuid: string;
    title: string;
    subTitle: string;
    isOnline: boolean;
    rightComponent: JSX.Element;
    onPress?: (event?: GestureResponderEvent) => void;
    onLongPress?: (event?: GestureResponderEvent) => void;
}

export const ProfileListItem = (Props: ProfileListItemProps) => {
    const RightComponent = () => Props.rightComponent;

    return (
        <TouchableRipple
            rippleColor="rgba(0, 0, 0, 0.3)"
            onPress={Props.onPress} // todo
            onLongPress={Props.onLongPress} // todo
        >
            <View style={styles.container}>
                <Image
                    style={styles.profileImage}
                    source={require("../../../assets/img/defaultProfileImage.png")}
                />
                {Props.isOnline && <View style={styles.onlineDot}></View>}
                <View style={styles.textContainer}>
                    <Text style={styles.displayText}>{Props.title}</Text>
                    <Text style={styles.statusText}>{Props.subTitle}</Text>
                </View>
                <RightComponent {...Props.rightComponent.props} />
            </View>
        </TouchableRipple>
    );
};
