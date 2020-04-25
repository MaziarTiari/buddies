import React, { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./AppScreen.style";

interface AppScreenProps {
    children?: ReactNode;
}

const AppScreen = ( Props: AppScreenProps ) => {
    return (
        <View style={styles.screen}>
            {Props.children}
        </View>
    );
};

export default AppScreen;