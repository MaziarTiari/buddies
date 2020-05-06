import React, { useState } from "react";
import Container from "../Container/Container";
import { FlatList } from "react-native-gesture-handler";
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import { activities } from "../../dev/example_data/fetchedActivityList";

const ActivityList = () => {
    const allActivities = useState(activities)[0];
    return (
        <Container type='screen' layout='root'>
            <Container type='screen' layout="body">
            <FlatList data={allActivities}
                renderItem={ ({item}) => <ActivityListItem {...item} />}
                keyExtractor={item => item.id.toString()}
            />
            </Container>
        </Container>
    );
};

export default ActivityList;
