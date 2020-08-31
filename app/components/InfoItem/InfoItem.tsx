import React, { ReactNode } from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useInfoItemStyle } from './InfoItem.style';

interface InfoItemProps {
    keyText: string;
    valueText: string | ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    keyTextStyle?: StyleProp<TextStyle>;
    valueTextStyle?: StyleProp<TextStyle>;
}

const InfoItem = (Props: InfoItemProps) => {
    const styles = useInfoItemStyle();
    return (
        <View style={[styles.container, Props.containerStyle]}>
            <Text style={[styles.key, Props.keyTextStyle]}>
                {Props.keyText + ":"}
            </Text>
            <Text style={[styles.value, Props.valueTextStyle]}>
                {Props.valueText}
            </Text>
        </View>
    )
}

export default InfoItem
