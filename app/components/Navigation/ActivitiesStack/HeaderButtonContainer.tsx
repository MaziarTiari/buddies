import React from 'react'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { navigationComponentNames } from '../componentNames'
import Color from '../../../utils/theme/color'

export const ActivitiesStackHeaderButtonContainer = ({navigation}: any) => (
    <View style={{ flexDirection: "row" }}>
        <IconButton
            color={Color.secondaryText}
            icon="heart"
            onPress={() => navigation.navigate(navigationComponentNames.ActivityList)}
        />
        <IconButton
            color={Color.secondaryText}
            icon="wunderlist"
            onPress={() =>
                navigation.navigate(navigationComponentNames.ActivityList)
            }
        />
    </View>
)