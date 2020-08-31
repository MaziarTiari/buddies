import React, { useContext } from "react";
import { View, Text, Image, GestureResponderEvent, ActivityIndicator } from "react-native";
import useStyle from "./ProfileListItem.style";
import { TouchableRipple } from "react-native-paper";
import Container from "../Container/Container";
import { Switch, Case, Default, If } from 'react-if';
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { useNavigation } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";

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
                        <View style={styles.profileImageContainer}>
                            <Image
                                style={styles.profileImage}
                                source={require(
                                    "../../../assets/img/defaultProfileImage.png")}
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
