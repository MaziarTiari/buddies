import React from 'react';
import { IForeignActivity, IActivity, IApplication } from '../../models/Activity'
import { createContext, useState, ReactNode, useMemo, useEffect, useContext } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr';
import { hubs, baseUrl } from '../../api/channels';
import { SessionContext } from '../SessionContext/SessionContext';
import { activityApi } from '../../api/ApiClient';
import { AxiosError } from 'axios';

export interface ActivityContextModel {
    ownActivities: Array<IActivity>;
    foreignActivities: Array<IForeignActivity>;
    isLoadingOwn: boolean;
    isLoadingForeign: boolean;
    unhandledApplications: number;
    updateOwnActivity: (activity: IActivity) => void;
    fetchOwnActivities: () => void;
    fetchForeignActivities: () => void;
}

export const initState: ActivityContextModel = {
    ownActivities: [],
    foreignActivities: [],
    isLoadingOwn: false,
    isLoadingForeign: false,
    unhandledApplications: 0,
    updateOwnActivity: () => console.warn("updateActivity() not implemented!"),
    fetchOwnActivities: () => console.warn("fetchOwnActivities() not implemented!"),
    fetchForeignActivities: () => console.warn("fetchForeignActivities() not implemented!")
}

export const ActivityContext = createContext(initState);

type ContextActivity = IActivity | IForeignActivity;

export function ActivityContextProvider(props: { children: ReactNode }) {
    const { user } = useContext(SessionContext);
    const [ownActivities, setOwnActivities] = useState(initState.ownActivities);
    const [foreignActivities, setForeignActivities] = useState(initState.foreignActivities);
    const [isLoadingOwn, setIsLoadingOwn] = useState(initState.isLoadingOwn);
    const [isLoadingForeign, setIsLoadingForeign] = useState(initState.isLoadingForeign);

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

    useEffect(() => {
        if (user.id !== "") {
            fetchForeignActivities();
            fetchOwnActivities();
        }
    }, [user.id])

    function fetchOwnActivities() {
        setIsLoadingOwn(true);
        activityApi.GetAll<Array<IActivity>>("user/" + user.id)
            .then(activities => {
                setOwnActivities(activities);
                const activityIds = activities.map(a => a.id);
                activityHubConnection.invoke("addToActivityGroups", activityIds)
                    .catch(err => console.error(err));
            })
            .catch((error: AxiosError) => console.error("include: ", error))
            .finally(() => setIsLoadingOwn(false))
    }

    function fetchForeignActivities() {
        setIsLoadingForeign(true);
        activityApi.GetAll<Array<IForeignActivity>>("exclude/" + user.id)
            .then(activities => {
                setForeignActivities(activities);
                const activityIds = activities.map(a => a.id);
                activityHubConnection.invoke("addToActivityGroups", activityIds)
                    .catch(err => console.error(err));
            })
            .catch((error: AxiosError) => console.error("exclude: ", error))
            .finally(() => setIsLoadingForeign(false))
    }

    useEffect(() => {
        activityHubConnection.on("updateActivity", (activity: IForeignActivity) => {
            console.log("new activity: ", activity)
            updateForeignActivity(activity);
        });
        return () => {
            activityHubConnection.off("updateActivity");
        }
    }, [foreignActivities]);

    useEffect(() => {
        activityHubConnection.on("newApplicant", (application: IApplication) => {
            let activity = ownActivities.find(a => a.id === application.activityId);
            if (activity) {
                activity.applicantUserIds = activity?.applicantUserIds
                    ? [...activity.applicantUserIds, application.applicantId]
                    : [application.activityId]
                    ;
                setOwnActivities(getUpdatedActivities([...ownActivities], activity));
            }
        });
        return () => activityHubConnection.off("newApplicant");
    }, [ownActivities]);

    useEffect(() => {
        activityHubConnection.on("newActivity", (activity: IForeignActivity) => {
            if (activity.userId === user.id) {
                setOwnActivities([...ownActivities, activity])
            } else {
                setForeignActivities([...foreignActivities, activity]);
            }
        })
        return () => activityHubConnection.off("newActivity");
    }), [foreignActivities, ownActivities];

    function getUpdatedActivities(
        activities: Array<ContextActivity>,
        activity: ContextActivity) {
        const activityIndex = activities.findIndex(a => a.id === activity.id);
        activities[activityIndex] = activity;
        return activities;
    }

    function updateForeignActivity(activity: IForeignActivity) {
        setIsLoadingForeign(true);
        setForeignActivities(
            getUpdatedActivities(
                [...foreignActivities], activity) as Array<IForeignActivity>
        );
        setIsLoadingForeign(false);
    }

    function updateOwnActivity(activity: IActivity) {
        setIsLoadingOwn(true);
        setOwnActivities(getUpdatedActivities([...ownActivities], activity));
        setIsLoadingOwn(false);
    }

    const unhandledApplications = useMemo(() => {
        let count = 0;
        ownActivities.forEach(a => count += a.applicantUserIds.length);
        return count;
    }, [ownActivities]);

    const contextValue: ActivityContextModel = {
        isLoadingOwn,
        isLoadingForeign,
        ownActivities,
        foreignActivities,
        unhandledApplications,
        updateOwnActivity: updateOwnActivity,
        fetchOwnActivities: fetchOwnActivities,
        fetchForeignActivities: fetchForeignActivities
    };

    return (
        <ActivityContext.Provider value={contextValue}>
            {props.children}
        </ActivityContext.Provider>
    )
}