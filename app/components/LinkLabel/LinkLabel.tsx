import React, { useContext } from 'react'
import { View, Text, TouchableHighlightProps, StyleProp, TextStyle, StyleSheet } from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { fontsizes, getResponsiveSize } from '../../utils/font/font'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'

interface LinkLabelProps extends TouchableHighlightProps {
    label: string;
    labelStyle?: StyleProp<TextStyle>
}
const LinkLabel = (Props: LinkLabelProps) => {
    const {theme} = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
        touchOpacity: {
            padding: getResponsiveSize(10)
        },
        label: {
            fontSize: fontsizes.medium,
            color: theme.App.interactiveItem,
            fontWeight: '700'
        }
    });

    return (
        <View style={[styles.container, Props.style]}>
            <TouchableOpacity onPress={Props.onPress} style={styles.touchOpacity}>
                <Text style={[styles.label, Props.labelStyle]}>{Props.label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LinkLabel
