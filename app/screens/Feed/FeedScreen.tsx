import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../../utils/theme/color";

const FeedScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Feed Screen</Text>
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

export default FeedScreen;
