import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { styles } from "./ScreenContentContainer.style";

interface AppScreenProps extends ViewProps{
    children?: ReactNode;
}

const ScreenContentContainer = (Props: AppScreenProps) => {
    return <View style={styles.screen}>{Props.children}</View>;
};

export default ScreenContentContainer;
