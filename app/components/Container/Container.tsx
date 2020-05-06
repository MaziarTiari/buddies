import React, { ReactNode } from 'react'
import { View, ViewProps, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { useStyle } from './Container.style';

interface ContainerProps extends ViewProps{
    keyboardAvoiding?: boolean
    children?: ReactNode;
}

interface ScreenContainerProps extends ContainerProps {
    type: 'screen';
    layout: ScreenLayout;
}

interface ComponentContainerProps extends ContainerProps {
    type: 'component'
    layout: ComponentLayout;
}

type ScreenLayout = 'root' | 'body';
type ComponentLayout = 'root' | 'root_center';

const Container = ( {layout, type, style, keyboardAvoiding, ...Props}: 
        ComponentContainerProps | ScreenContainerProps) => {

    const styles = useStyle();

    const containerStyle = type === 'component'
                   ? styles.component[ layout as ComponentLayout ]
                   : styles.screen[ layout as ScreenLayout ];

    return (
        keyboardAvoiding 
        ?   <View style={[ style, containerStyle ]} {...Props}>
                <KeyboardAvoidingView
                    children={Props.children}
                    behavior={Platform.select({android: undefined, ios: 'padding'})}
                />
            </View>
        :   <View style={[ style, containerStyle ]} {...Props} />
    )
}
export default Container
