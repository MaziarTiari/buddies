import React from "react";
import { View, Text, Image, GestureResponderEvent } from "react-native";
import styles from "./ProfileListItem.style";
import { TouchableRipple } from "react-native-paper";
import Container from "../Container/Container";

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
            onPress={Props.onPress}
            onLongPress={Props.onLongPress}
        >
            <Container type="component" layout="root" style={styles.root}>
            <View style={styles.container}>
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={require("../../../assets/img/defaultProfileImage.png")}
                    />
                    {Props.isOnline && <View style={styles.onlineDot}></View>}
                </View>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.displayText}>
                        {Props.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.statusText}>
                        {Props.subTitle}
                    </Text>
                </View>
                <RightComponent {...Props.rightComponent.props} />
            </View>
            </Container>
        </TouchableRipple>
    );
};
