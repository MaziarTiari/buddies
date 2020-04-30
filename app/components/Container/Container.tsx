import React, { ReactNode } from 'react'
import { View, ViewProps, KeyboardAvoidingView, Platform } from 'react-native'
import { styles } from './Container.style';


interface ContainerProps extends ViewProps{ 
    keyboardAvoiding?: boolean
    layout: 'screen' | 'centered_body';
    children?: ReactNode;
}

const Container = ( {children, layout, style, keyboardAvoiding, ...Props}: 
        ContainerProps) => {
    return (
        keyboardAvoiding 
        ?   <View style={[style, styles[layout] ]} {...Props}>
                <KeyboardAvoidingView
                    children={children}
                    behavior={Platform.select({android: undefined, ios: 'padding'})}
                />
            </View>
        :
            <View style={[style, styles[layout] ]} {...Props} children={children}/>
    )
}
export default Container
