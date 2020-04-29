import React, { ReactNode } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { IActivity } from '../../../example_data/fetchedActivityList'
import { IconButton, Headline } from 'react-native-paper'
import Color from '../../utils/theme/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
const defaultImg = require('../../../assets/img/default-activity-img.jpg');

const ActivityListItem = (Props: IActivity) => {

    const imageSource = Props.imagePath ? Props.imagePath : defaultImg;
    const onFavorite = () => {
    }
    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <IconButton 
                    icon="heart" onPress={()=>{}} style={styles.leftHeaderButton} 
                    color={Color.secondaryText}
                />
                <IconButton 
                    icon="dots-horizontal" onPress={()=>{}} 
                    style={styles.rightHeaderButton} color={Color.secondaryText}
                />
            </View>
            <TouchableOpacity style={styles.activityContainer}>
                <Image source={imageSource} style={styles.activityImage}/>
                <View style={styles.activityInfoContainer}>
                    <Headline style={styles.activityInfoHeader}>
                        {Props.title + " - " + Props.membersUserIds?.length + "/"} 
                        {Props.allowedApplyNumber}
                    </Headline>
                    <Text style={styles.activityInfoContent}>{Props.location}</Text>
                    {
                    (Props.startDate || Props.endDate) && 
                    <Text>{Props.startDate + '-' + Props.endDate}</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex:1, 
        flexDirection:"column", 
        justifyContent:'center', 
        alignItems:'stretch', 
        marginBottom:30, 
        borderTopWidth:1, 
        borderTopColor:"#212227"
    },
    header: {
        flex:1, 
        flexDirection:"row", 
        alignItems:"stretch", 
        justifyContent:"space-between"
    },
    leftHeaderButton: {
        alignSelf:'flex-start',
    },
    rightHeaderButton: {
        alignSelf:'flex-end',
    },
    activityContainer: {
        backgroundColor:"#253341", 
        paddingBottom:10, 
        borderBottomLeftRadius:4, 
        borderBottomRightRadius:4
    },
    activityImage: {
        flex:1, 
        width: 400, 
        height:250, 
        borderTopLeftRadius:4, 
        borderTopRightRadius:4
    },
    activityInfoContainer: {
        flex:1, 
        marginTop: 20, 
        alignSelf:'stretch', 
        paddingHorizontal:10, 
        height:100, 
        alignContent:"flex-start"
    },
    activityInfoHeader: {
        fontWeight: "700",
        color:Color.primaryText,
    },
    activityInfoContent: {
        fontWeight: "700",
        color:Color.primaryText,
    }
});

export default ActivityListItem
