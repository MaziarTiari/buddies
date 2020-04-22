import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../../utils/theme/color";

const ChatListScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Chatlist Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.screenBackground,
    },
    text: {
        color: Color.secondaryText,
    },
});

export default ChatListScreen;
