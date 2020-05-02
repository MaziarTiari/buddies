import React, { useMemo } from 'react'
import { View, Image, Text, GestureResponderEvent } from 'react-native'
import { IActivity } from '../../../example_data/fetchedActivityList';
import { IconButton, Headline, TouchableRipple } from 'react-native-paper'
import Color from '../../utils/theme/color';
import { fontsizes } from '../../utils/theme/font';
import { users } from '../../../example_data/users';
import { IProfile } from '../../../example_data/FetchedProfile';
import { styles } from './ActivityListItem.style'
import { Device } from '../../utils/class/Device';
const defaultImg = require('../../../assets/img/default-activity-img.jpg');

const device = new Device();

const ActivityListItem = (Props: IActivity) => {
    
    const owner = users.find( user => user.id === Props.ownerUserId ) as IProfile;
    const ownerName = owner.firstname ? owner.firstname + " " + owner.lastname
                                      : owner.username;
    const participatesCount = Props.membersUserIds?.length + "/" + 
                              Props.allowedApplyNumber
    const titleContent = Props.title + " Hallo das soll ein sehr langer Text sein";
    const imageSource = getImageSource(Props.imageName);
    const dateScale = getDateScale(Props.startDate, Props.endDate);
    const timeScale = getTimeScale(Props.startTime, Props.endTime);

    const onPress = () => {}
    const onParticipates = () => {}
    const onChat = (event?: GestureResponderEvent) => {}
    const onFavorite = () => {}

    return (
        <TouchableRipple style={styles.root} onPress={onPress}>
            <View>
                <View style={styles.header}>
                    <View style={styles.header}>
                        <IconButton 
                            icon="chat" color={Color.Theme.basicItem}
                            size={fontsizes.icon} style={styles.icon} onPress={onChat}
                        />
                        <Text style={styles.ownerName}>{ownerName}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text
                            style={{color:Color.Theme.basicItem}}>
                                {participatesCount}
                        </Text>
                        <IconButton icon='account-group' color={Color.Theme.basicItem} 
                                    size={fontsizes.icon} onPress={onParticipates}
                                    style={[styles.icon, {marginLeft:0}]}/>
                    </View>
                </View>
                <View style={styles.container}>
                    <Image style={styles.image} source={imageSource} />
                    <View style={styles.inforContainer}>
                        <Headline numberOfLines={2} style={styles.title}>
                            {titleContent}
                        </Headline>
                        <View>
                            <Text numberOfLines={2} style={styles.info}>
                                {Props.location}
                            </Text>
                            {
                            (Props.startDate || Props.endDate) && 
                                <Text style={styles.info}>{dateScale}</Text>
                            }
                            {
                            (Props.startTime || Props.endTime) && 
                                <Text style={styles.info}>{timeScale}</Text>
                            }
                        </View>
                    </View>
                </View>
                <IconButton 
                    icon="star-outline" color={Color.Theme.basicItem} onPress={onFavorite}
                    size={fontsizes.icon} style={[styles.icon, styles.bottomRightIcon]}/>
            </View>
        </TouchableRipple>
    );
}

const getDateScale = (startDate?: Date, endDate?: Date) => {
    const start = startDate?.toLocaleDateString();
    const end = endDate?.toLocaleDateString();
    if( (start === end) || !end ) return start;
    return start + " - " + end;
}

const getTimeScale = (startTime?: Date, endTime?: Date) => {
    const start = startTime?.toLocaleTimeString();
    const end = endTime?.toLocaleTimeString();
    if( (start === end) || !end ) return start;
    return start + " - " + end;
}

const getImageSource = (title: string) => {
    switch(title) {
        case 'meditation.jpg':
            return require('../../../assets/img/meditation.jpg');
        case 'mountain-bike.jpg':
            return require('../../../assets/img/mountain-bike.jpg');
        default:
            return defaultImg;
    }
}

export default ActivityListItem
