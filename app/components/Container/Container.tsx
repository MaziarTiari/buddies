import React, { ReactNode } from 'react'
import { View, ViewProps, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { useStyle } from './Container.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface ContainerProps extends ViewProps{
    keyboardAvoiding?: boolean
    keyboardAwareScrollView?: boolean;
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

const Container = ( {
            layout, type, style, keyboardAvoiding, keyboardAwareScrollView ,...Props
        }: ComponentContainerProps | ScreenContainerProps) => {

    const styles = useStyle();

    const containerStyle = type === 'component'
                   ? styles.component[ layout as ComponentLayout ]
                   : styles.screen[ layout as ScreenLayout ];

    if(keyboardAvoiding)
            return <KeyboardAvoidingView
                        style={[ style, containerStyle ]} {...Props}
                        behavior={Platform.select({android: undefined, ios: 'padding'})}
                    />
    else if(keyboardAwareScrollView)
            return <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }} style={style}
                        contentContainerStyle={containerStyle} {...Props}
                    />
    else
            return <View style={[ style, containerStyle ]} {...Props} />
}
export default Container
