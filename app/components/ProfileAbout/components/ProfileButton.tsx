import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from '../../Button/Button';
import { getResponsiveSize } from '../../../utils/font/font';
import { StyleSheet } from 'react-native';

interface ProfileButtonProps {
    type: "subscribe" | "message";
    onPress: () => void;
    active?: boolean;
}

const styles = StyleSheet.create({
    body: { 
        padding: 0, 
        width: '47%', 
        height: "100%",
    },
    title: {
        fontSize: getResponsiveSize(21)
    }
});

export const ProfileButton = (props: ProfileButtonProps) => (
    <Button 
        title= {props.type === "subscribe" ? "Abonieren" : "Nachricht"}
        icon={
            <MaterialCommunityIcons 
                color="white" 
                name= {
                    props.active 
                        ? "menu-down" 
                        : props.type === "subscribe" ? "plus" : "message-text"
                }
                size={20}
            />
        }
        textStyle={styles.title}
        style={styles.body}
        type={
            props.active 
                ? "active" 
                : props.type === "subscribe" ? "accept" : "action"
        }
        onPress={props.onPress}
    />
);