import { ApiClient } from "../api/ApiClient";
import { Activity } from "../models/Activity";
import { getServiceUrl } from "../api/channels";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";

const activityApi = new ApiClient<Activity>(
    { baseURL: getServiceUrl("Activities") }
);

export function useActivities() {
    const [activities, setActivities] = useState<Array<Activity>>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => fetchActivityList(), []);
    
    const fetchActivityList = () => {
        setIsLoading(true);
        activityApi.GetAll<Activity[]>()
            .then((response: Activity[]) => {
                setActivities(response);
                setIsLoading(false);
            })
            .catch((error: AxiosError) => console.log(error));
    };

    return ({
        activities: activities,
        isLoading: isLoading,
        fetchActivityList: fetchActivityList
    });
}
