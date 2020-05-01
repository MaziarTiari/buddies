import React, { useState } from "react";
import Container from "../Container/Container";
import { FlatList } from "react-native-gesture-handler";
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import { activities } from "../../../example_data/fetchedActivityList";

const ActivityList = () => {
    const [allActivities, setAllActivities] = useState(activities)
    return (
        <Container layout="screen_centered">
            <FlatList data={allActivities} style={{width:"100%"}}
                renderItem={ ({item}) => <ActivityListItem {...item} />}
                keyExtractor={item => item.id.toString()}
            />
        </Container>
    );
};

export default ActivityList;
