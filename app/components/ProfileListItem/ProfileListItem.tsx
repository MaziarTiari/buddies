import React, { useContext } from "react";
import { View, Text, GestureResponderEvent, ActivityIndicator, Image } from "react-native";
import useStyle from "./ProfileListItem.style";
import { TouchableRipple } from "react-native-paper";
import Container from "../Container/Container";
import { If } from 'react-if';
import { IImage } from "../../models/Image";

export interface ProfileListItemProps {
    userId: string;
    title: string;
    subTitle: string;
    isOnline: boolean;
    rightComponent?: JSX.Element;
    onPress?: (event?: GestureResponderEvent) => void;
    onLongPress?: (event?: GestureResponderEvent) => void;
    backgroundColor?: string;
    isLoading?: boolean;
    avatar?: IImage
}

export const ProfileListItem = (props: ProfileListItemProps) => {
    const styles = useStyle();

    return (
        <View>
            <If condition={!!props.isLoading}>
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator/>
                    </View>
            </If>
            <TouchableRipple
                onPress={props.onPress}
                onLongPress={props.onLongPress}
                style={{backgroundColor: props.backgroundColor}}
            >
                <Container 
                    type="component" 
                    layout="root" 
                    style={[
                        styles.root, 
                        { borderBottomWidth: props.backgroundColor ? 0 : 1 }
                    ]}
                >
                    <View style={styles.container}>
                        <View style={styles.profileAvatarContainer}>
                            <Image
                                style={styles.profileImage}
                                source={props.avatar 
                                    ? {uri: "data:image/gif;base64," + props.avatar.base64}
                                    : require("../../../assets/img/defaultProfileImage.png")
                                }
                            />
                            {props.isOnline && <View style={styles.onlineDot}></View>}
                        </View>
                        <View style={styles.textContainer}>
                            <Text numberOfLines={1} style={styles.displayText}>
                                {props.title}
                            </Text>
                            <Text numberOfLines={1} style={styles.statusText}>
                                {props.subTitle}
                            </Text>
                        </View>
                        {props.rightComponent}
                    </View>
                </Container>
            </TouchableRipple>
        </View>
    );
};
