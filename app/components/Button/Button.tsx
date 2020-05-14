import React from 'react'
import { Text, TouchableOpacityProps, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ButtonProps extends TouchableOpacityProps{
    title: string;
}
const Button = ({title, ...Props}: ButtonProps) => {
    return (
        <TouchableOpacity {...Props} style={[styles.container, Props.style]}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}
// TODO: fix
const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        backgroundColor:"#C48A1D",
        padding:"2%",
        borderRadius: 20,
        width:"100%",
    },
    title: {
        flex:1, 
        fontSize:22,
        fontWeight:"500", 
        textAlign:"center",
        color:"#fff"
    }
});

export default Button
