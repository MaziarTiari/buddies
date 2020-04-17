import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './Button.component.style'

interface ButtonProps extends TouchableOpacityProps{
    title: string;
}

const Button = ({title, ...Props}: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} {...Props}>
            <Text style={styles.content}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button
