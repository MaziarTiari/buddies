import { activityApi } from "../api/ApiClient";
import { IActivity, IApplication, IOthersActivity } from "../models/Activity";
// import { baseUrl, hubs } from "../api/channels";
import { useState, useEffect, useMemo, useLayoutEffect, useContext } from "react";
import { AxiosError } from "axios";
// import { HubConnectionBuilder } from '@microsoft/signalr';
import { SessionContext } from "../context/SessionContext/SessionContext";

export function useActivities(filterType: "exclude" | "user", userId: string,) {

    const { user } = useContext(SessionContext);

    /* Websocket
    const activityHubConnection = useMemo(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(baseUrl + hubs.activities)
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => console.log("Connection started!"))
            .catch(err => console.warn("Could not connect to websocket: " + err));
        return connection;
    }, []);
    */

    const [activities, setActivities] = useState<Array<IActivity | IOthersActivity>>([]);
    const [isLoading, setIsLoading] = useState(false);

    /* Websocket
    useEffect(() => activityHubConnection.on("updateActivity", (activity: IActivity) => {
        updateActivity(activity);
    }), [activities])

    useEffect(() => activityHubConnection.on(
        "newApplicant", (application: IApplication) => {
            onNewApplication(application)
        }), [activities])

    useEffect(() => activityHubConnection.on(
        "newActivity", (activity: IOthersActivity) => {
            if (filterType === "exclude" && activity.userId !== user.id
                || filterType === "user" && activity.userId === user.id) {
                setActivities([...activities, activity]);
            }
        })), [activities];
    */

    useLayoutEffect(() => fetchActivityList(), []);

    /* Websocket
    function onNewApplication(application: IApplication) {
        let index;
        let activity: IActivity | undefined = undefined;
        activities.forEach((a, i) => {
            if (a.id === application.activityId) {
                index = i;
                activity = a;
            }
        });
        if (activity) {
            activity = activity as IActivity;
            if (!activity.applicantUserIds.includes(application.applicantId)) {
                activity.applicantUserIds.push(application.applicantId);
                // TODO...
            }
        } else {
            console.error("Activity of application not found!");
        }
    }
    */

    function fetchActivityList() {
        setIsLoading(true);
        activityApi.GetAll<Array<IActivity | IOthersActivity>>(filterType + "/" + userId)
            .then(activities => {
                setActivities(activities);
                /* Websocket
                const activityIds = activities.map(a => a.id);
                activityHubConnection.invoke("addToActivityGroups", activityIds)
                    .catch(err => console.error(err));
                */
            })
            .catch((error: AxiosError) => console.error(error))
            .finally(() => setIsLoading(false));
    }

    /* Websocket
    function updateActivity(newActivity: IActivity) {
        let updatingActivities = [...activities];
        const indexOfOldActivity = activities.findIndex(a => a.id === newActivity.id);
        updatingActivities[indexOfOldActivity] = Object.assign(
            {}, updatingActivities[indexOfOldActivity], { ...newActivity }
        );
        setActivities(updatingActivities);
    }
    */

    return ({
        activities: activities,
        isLoading: isLoading,
        fetchActivityList: fetchActivityList
    });
}
