import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useStyle } from './InfoItem.style';

interface InfoItemProps {
    keyText: string;
    valueText: string;
    containerStyle?: StyleProp<ViewStyle>;
    keyTextStyle?: StyleProp<TextStyle>;
    valueTextStyle?: StyleProp<TextStyle>;
}

const InfoItem = (Props: InfoItemProps) => {
    const styles = useStyle();
    return (
        <View style={[styles.container, Props.containerStyle]}>
            <Text style={[styles.key, Props.keyTextStyle]}>{Props.keyText + ":"}</Text>
            <Text style={[styles.value, Props.valueTextStyle]}>{Props.valueText}</Text>
        </View>
    )
}

export default InfoItem
