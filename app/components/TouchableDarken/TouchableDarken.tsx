import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Utilities } from '../../utils/AppUtilities';

export interface TouchableDarkenProps extends TouchableOpacityProps {
    color: string;
    children?: ReactNode;
    transparent?: boolean;
}
export const TouchableDarken = (props: TouchableDarkenProps) => (
    <TouchableHighlight
            underlayColor={Utilities.LightenDarkenColor(props.color, -30)}
            {...props}
            style={[props.style, !props.transparent && {backgroundColor: props.color}]}
        >
            {props.children}
    </TouchableHighlight>
)