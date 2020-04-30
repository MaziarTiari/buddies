import React from "react";
import Container from "../Container/Container";
import { FlatList } from "react-native-gesture-handler";
import ActivityListItem from "../ActivityListItem/ActivityListItem";

const ActivityList = () => {
    const [allActivities, setAllActivities] = useState(activities)
    return (
        <Container layout="screen_centered">
            <FlatList data={allActivities}
                renderItem={ ({item}) => <ActivityListItem {...item} />}
                keyExtractor={item => item.id.toString()}
            />
        </Container>
    );
};

export default ActivityList;
