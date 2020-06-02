import React, { useContext } from 'react'
import { View, Text, TouchableHighlightProps, StyleProp, TextStyle, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { fontsizes } from '../../utils/font/font'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'

interface LinkLabelProps extends TouchableHighlightProps {
    label: string;
    labelStyle?: StyleProp<TextStyle>
}
const LinkLabel = (Props: LinkLabelProps) => {
    const {theme} = useContext(ThemeContext);

    const styles = StyleSheet.create({
        label: {
            fontSize: fontsizes.medium,
            color: theme.App.labelLinkColor
        }
    })

    return (
        <View style={[{flex:1, alignItems:"center"}, Props.style]}>
            <TouchableHighlight onPress={Props.onPress} style={{padding: 10}}>
                <Text style={[styles.label, Props.labelStyle]}>{Props.label}</Text>
            </TouchableHighlight>
        </View>
    )
}

export default LinkLabel
