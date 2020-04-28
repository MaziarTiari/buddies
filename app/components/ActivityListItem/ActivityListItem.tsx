import React, { ReactNode } from 'react'
import { View, Image, ImageSourcePropType, Text } from 'react-native'
import { IActivity } from '../../../example_data/fetchedActivityList'
import { IconButton, Headline } from 'react-native-paper'
import Color from '../../utils/theme/color';
const defaultImg = require('../../../assets/img/default-activity-img.jpg');

const ActivityListItem = (Props: IActivity) => {

    const imageSource = Props.imagePath ? Props.imagePath : defaultImg;
    const onFavorite = () => {

    }
    return (
        <View style={{flex:1, borderBottomWidth: 1, paddingBottom: 50}}>
        <View style={{flex:1, flexDirection:"column", justifyContent:'center', alignItems:'stretch'}}>
            <View style={{flex:1}}>
                <IconButton icon="heart" onPress={onFavorite} style={{alignSelf:'flex-end'}} color={Color.secondaryText}/>
            </View>
            <View style={{flex:1}}>
                <Image source={imageSource} style={{flex:1, width: 400, height: 200}}/>
            </View>
            <View style={{flex:1, marginTop: 20, alignSelf:'stretch'}}>
                <Headline style={{color:Color.primaryText}}>
                    {Props.title + " - " + Props.membersUserIds?.length + "/"} 
                    {Props.allowedApplyNumber}
                </Headline>
                <Text style={{color:Color.primaryText}}>{Props.location}</Text>
                { 
                    (Props.startDate || Props.endDate) && 
                    <Text>{Props.startDate + '-' + Props.endDate}</Text>
                }
            </View>
        </View>
        </View>
    )
}

export default ActivityListItem
