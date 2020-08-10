import React, { useContext } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { fontsizes, getLineHeight } from '../../utils/font/font';


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

const useStyle = () => {
    const { theme } = useContext(ThemeContext);

    return StyleSheet.create({
        container: {
            flex: 2,
            flexDirection: "row",
        },
        key: {
            flex: 1,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.primaryText
        },
        value: {
            flex: 1,
            fontSize: fontsizes.small,
            lineHeight: getLineHeight(fontsizes.small),
            color: theme.App.secondaryText
        }
    });
}

export default InfoItem
