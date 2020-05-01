import React, { useMemo } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { IActivity } from '../../../example_data/fetchedActivityList'
import { IconButton, Headline } from 'react-native-paper'
import Color from '../../utils/theme/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
const defaultImg = require('../../../assets/img/default-activity-img.jpg');

const ActivityListItem = (Props: IActivity) => {
    const imageSource = useMemo(() => {
        switch(Props.imageName) {
            case 'meditation.jpg':
                return require('../../../assets/img/meditation.jpg');
            case 'mountain-bike.jpg':
                return require('../../../assets/img/mountain-bike.jpg');
            default:
                return defaultImg;
        }
    },[]);

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <IconButton 
                    icon="heart" onPress={()=>{}} style={styles.leftHeaderButton} 
                    color={Color.Theme.contentBasicButton}
                />
                <IconButton 
                    icon="dots-horizontal" onPress={()=>{}} 
                    style={styles.rightHeaderButton}
                    color={Color.Theme.contentBasicButton}
                />
            </View>
            <TouchableOpacity style={styles.activityContainer}>
                <Image 
                    onError={e => console.log(e)} style={styles.activityImage}
                    source={imageSource} 
                />
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
        borderBottomWidth:1, 
        borderBottomColor: Color.Theme.basicItem
    },
    header: {
        flex:1, 
        flexDirection:"row", 
        justifyContent:"space-between"
    },
    leftHeaderButton: {
        alignSelf:'flex-start',
    },
    rightHeaderButton: {
        alignSelf:'flex-end',
    },
    activityContainer: {
        flex: 1,
        borderBottomLeftRadius:4, 
        borderBottomRightRadius:4
    },
    activityImage: {
        width: "100%",
        height:250, 
        borderTopLeftRadius:10, 
        borderTopRightRadius:10
    },
    activityInfoContainer: {
        flex:1, 
        paddingTop: 10, 
        alignSelf:'stretch',
        paddingHorizontal:10, 
        height:100, 
        alignContent:"flex-start"
    },
    activityInfoHeader: {
        fontWeight: "700",
        color: Color.Theme.primaryText,
    },
    activityInfoContent: {
        fontWeight: "600",
        color:Color.Theme.primaryText,
    }
});

export default ActivityListItem
