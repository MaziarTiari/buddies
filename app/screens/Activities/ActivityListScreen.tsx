import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ActivityList = () => {
    return (
        <View style={styles.screen}>
            <Text>Activity List Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ActivityList;
