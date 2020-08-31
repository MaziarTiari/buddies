import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import useActionButtonStyle from './ActionButton.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { getResponsiveSize } from '../../utils/font/font';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { TouchableDarken } from '../TouchableDarken/TouchableDarken';

export interface ActionButtonChildProps {
    onPress: () => void;
    icon: string;
}

export interface ActionButtonProps extends ActionButtonChildProps {
    children?: ActionButtonChildProps[];
    showChildren?: boolean;
    horizontalLeft?: boolean;
}

function ActionButton(props: ActionButtonProps) {
    const styles = useActionButtonStyle();
    const { theme } = useContext(ThemeContext);

    const renderButton = (
        props: ActionButtonChildProps,
        isChild: boolean,
        index?: number
    ): JSX.Element => (
        <TouchableDarken
            key={index}
            color={theme.Button.primary} 
            style={isChild ? styles.childButton : styles.button} 
            onPress={props.onPress}
        >
            <MaterialCommunityIcons
                name={props.icon}
                color={theme.App.primaryText}
                size={isChild ? getResponsiveSize(30) : getResponsiveSize(50)}
            />
        </TouchableDarken>
    );

    return (
        <View style={styles.overlay} pointerEvents="box-none" >
            {props.showChildren && props.children && props.children.map((child, index) =>
                renderButton(child, true, index)
            )}
            {renderButton(props, false)}
        </View>
    );
};

export default ActionButton;
