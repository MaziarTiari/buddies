import { ApiClient } from "../api/ApiClient";
import { IActivity } from "../models/Activity";
import { getServiceUrl } from "../api/channels";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";

const activityApi = new ApiClient<IActivity>(
    { baseURL: getServiceUrl("Activities") }
);

export function useActivities() {
    const [activities, setActivities] = useState<Array<IActivity>>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => fetchActivityList(), []);
    
    const fetchActivityList = () => {
        setIsLoading(true);
        activityApi.GetAll<IActivity[]>()
            .then((response: IActivity[]) => {
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
