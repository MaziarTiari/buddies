import React, { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./ScreenContentContainer.style";

interface AppScreenProps {
    children?: ReactNode;
}

const ScreenContentContainer = ( Props: AppScreenProps ) => {
    return (
        <View style={styles.screen}>
            {Props.children}
        </View>
    );
};

export default ScreenContentContainer;