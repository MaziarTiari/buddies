import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { fontsizes, getLineHeight, getResponsiveSize } from '../../utils/font/font';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { useInfoWithIconStyle } from './InfoWithIcon.style';

interface  InfoWithIcon {
    icon: string, 
    text?: string, 
    redText?: string
}
export default function InfoWithIcon(props: InfoWithIcon) {
    const { translations } = useContext(LanguageContext);
    const { styles, theme } = useInfoWithIconStyle();
    
    return (
        <View style={styles.infoIconContainer}>
            <MaterialCommunityIcons
                name={props.icon}
                size={getLineHeight(fontsizes.small)}
                color={theme.App.primaryText}
            />
            <Text style={styles.infoText}>
                {props.text || translations.open}
            </Text>
            {props.redText && (
                <Text
                    style={[
                        styles.infoText,
                        { color: theme.App.errorColor }
                    ]}
                >
                    {props.redText}
                </Text>
            )}
        </View>
    );
}
