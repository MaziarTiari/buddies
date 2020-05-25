import React, { ReactNode, useState, useEffect } from 'react'
import { View, ViewProps, KeyboardEvent, Keyboard, GestureResponderEvent, ScrollView } from 'react-native'
import { useStyle } from './Container.style';
import { useScreenDimension } from '../../utils/device/ScreenDimension';

interface ContainerProps extends ViewProps{
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
            layout, type, style, children ,...Props
        }: ComponentContainerProps | ScreenContainerProps) => {

    const styles = useStyle();

    const containerStyle = type === 'component'
                   ? styles.component[ layout as ComponentLayout ]
                   : styles.screen[ layout as ScreenLayout ];


    return <View style={[ style, containerStyle ]} {...Props} children={children}/>
}
export default Container
