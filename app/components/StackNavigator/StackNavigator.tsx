import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Color from '../../utils/theme/color';
import { styles } from './StackNavigator.style';

const stackNav = createStackNavigator();

interface StackNavigatorScreen {
    name: string;
    component: React.ComponentType<any>;
    options?: {
        headerRight?: ((props: {tintColor?: string | undefined}) => React.ReactNode)
        headerTitle: string;
    }
}

interface StackNavigatorProps {
    initialRouteName?: string;
    screenDefinitionList: StackNavigatorScreen[];
}

const StackNavigator = ( Props: StackNavigatorProps ) => {
    return (
        <stackNav.Navigator initialRouteName={Props.initialRouteName}>
            {Props.screenDefinitionList.map((screen, index) =>
                <stackNav.Screen 
                    key={index} {...screen}
                    options= {{
                        ...screen.options,
                        headerTintColor: Color.secondaryText,
                        headerStyle: styles.stackNavScreenHeader, 
                    }}
                /> 
            )}
        </stackNav.Navigator>
    )
}

export default StackNavigator
