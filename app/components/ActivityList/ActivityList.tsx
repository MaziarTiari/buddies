import React, { useState } from "react";
import ScreenContentContainer from "../ScreenContentContainer/ScreenContentContainer";
import { FlatList } from "react-native-gesture-handler";
import { activities, IActivity } from '../../../example_data/fetchedActivityList'
import ActivityListItem from "../ActivityListItem/ActivityListItem";

const ActivityList = () => {
    const [allActivities, setAllActivities] = useState(activities)
    return (
        <ScreenContentContainer>
            <FlatList data={allActivities}
                renderItem={ ({item}) => <ActivityListItem {...item} />}
                keyExtractor={item => item.id.toString()}
            />
        </ScreenContentContainer>
    );
};

export default ActivityList;
