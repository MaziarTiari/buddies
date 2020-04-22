import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../../utils/theme/color";

const ParticipatedActivitiesScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Participated Activities Screen</Text>
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

export default ParticipatedActivitiesScreen;
