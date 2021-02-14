import React, { useCallback } from 'react';
import {
    IForeignActivity,
    IActivity,
    IActivityRequest
} from '../../models/Activity';
import {
    createContext,
    useState,
    ReactNode,
    useMemo,
    useEffect,
    useContext
} from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { hubs, baseUrl, apiRoutes } from '../../api/channels';
import { SessionContext } from '../SessionContext/SessionContext';
import { AxiosError, AxiosResponse } from 'axios';
import {
    activityContextModel,
    ActivityContextModel,
    ContextActivity
} from './activityContextModel';
import { useActivityClient } from '../../api/activityClient';

 export const ActivityContext = createContext(activityContextModel);

export function ActivityContextProvider(props: { children: ReactNode }) {

    const { 
        user, 
        activity: sessionActivity, 
        setActivity: setSessionActivity,
        setErrorMessage,
        token,
        authenticate,
    } = useContext(SessionContext);

    const activityClient = useActivityClient(token, authenticate);

    const [ownActivities, setOwnActivities] = useState(
        activityContextModel.ownActivities
    );
    const [foreignActivities, setForeignActivities] = useState(
        activityContextModel.foreignActivities
    );
    const [isLoadingOwn, setIsLoadingOwn] = useState(
        activityContextModel.isLoadingOwn
    );
    const [isLoadingForeign, setIsLoadingForeign] = useState(
        activityContextModel.isLoadingForeign
    );

    const activityHubConnection = useMemo(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(baseUrl + hubs.activities.connection)
            .withAutomaticReconnect()
            .build();

        connection
            .start()
            .then(() => console.log('Connection started!'))
            .catch((error: Error) => setErrorMessage(error.message));
        return connection;
    }, []);


    function getUpdatedActivities(
        activities: Array<ContextActivity>,
        activity: ContextActivity
    ) {
        const activityIndex = activities.findIndex((a) => a.id === activity.id);
        activities[activityIndex] = {...activities[activityIndex], ...activity};
        return activities;
    }

    const updateForeignActivity = useCallback((activity: ContextActivity) => {
        setIsLoadingForeign(true);
        if ((sessionActivity as IActivity)?.id === activity.id) {
            setSessionActivity({...activity});
        }
        const updatedActivities = getUpdatedActivities(
            [...foreignActivities], activity
        ) as Array<IForeignActivity>;

        setForeignActivities(updatedActivities);
        setIsLoadingForeign(false);
    }, [foreignActivities, getUpdatedActivities, sessionActivity]);

    const updateOwnActivity = useCallback((activity: IActivity) => {
        setIsLoadingOwn(true);
        if ((sessionActivity as IActivity)?.id === activity.id) {
            setSessionActivity(activity);
        }
        const updatedActivities = getUpdatedActivities([...ownActivities], activity);
        setOwnActivities(updatedActivities);
        setIsLoadingOwn(false);
    }, [sessionActivity, getUpdatedActivities, ownActivities]);

    const addApplicantId = useCallback((activity: ContextActivity, id: string) => {
        activity.applicantUserIds = activity?.applicantUserIds
            ? [...activity.applicantUserIds, id]
            : [id];
    },[]);

    function fetchOwnActivities() {
        setIsLoadingOwn(true);
        activityClient.getUsersActivities()
            .then(activities => {
                console.log("OWN ACTIVITIES:");
                activities.forEach(a => console.log(a.title));
                setOwnActivities(activities);
                const activityIds = activities.map((a) => a.id);
                activityHubConnection
                    .invoke(hubs.activities.subscribeMany, activityIds)
                    .catch((error: Error) => setErrorMessage(error.message));
            })
            .catch((error: AxiosError) => setErrorMessage(error.message))
            .finally(() => setIsLoadingOwn(false));
    }

    function fetchForeignActivities() {
        setIsLoadingForeign(true);
        activityClient.getForeignActivities()
            .then(activities => {
                console.log("OFFERS:");
                activities.forEach(a => console.log(a.title));
                setForeignActivities(activities);
                const activityIds = activities.map((a) => a.id);
                activityHubConnection
                    .invoke(hubs.activities.subscribeMany, activityIds)
                    .catch((error: Error) => setErrorMessage(error.message));
            })
            .catch((error: AxiosError) => setErrorMessage(error.message))
            .finally(() => setIsLoadingForeign(false));
    }

    function removeForeignActivity(activityId: string) {
        activityHubConnection.invoke(hubs.activities.unsubscribe, activityId);
        setForeignActivities([
            ...foreignActivities.filter((a) => a.id !== activityId)
        ]);
    }

    function hideActivity(activityId: string) {
        const activityRequest: IActivityRequest = {
            activityId: activityId,
            applicantId: user.id
        };
        activityClient.hideActivity(activityId)
            .then(() => removeForeignActivity(activityId))
            .catch((error: AxiosError) => setErrorMessage(error.message));
    }

    function applyToActivity(activityId: string) {
        const application: IActivityRequest = {
            activityId: activityId,
            applicantId: user.id
        };
        activityClient.applyActivity(activityId)
            .then(() => removeForeignActivity(activityId))
            .catch((error: AxiosError) => setErrorMessage(error.message));
    }

    const unhandledApplications = useMemo(() => {
        let count = 0;
        ownActivities.forEach((a) => (count += a.applicantUserIds.length));
        return count;
    }, [ownActivities]);

    useEffect(() => {
        if (user.id !== '') {
            activityHubConnection
                .invoke(hubs.activities.subscribeUser, user.id)
                .catch((error: Error) => setErrorMessage(error.message));
            fetchForeignActivities();
            fetchOwnActivities();
        }
    }, [user.id]);

    useEffect(() => {
        activityHubConnection.on(
            hubs.activities.onUpdate,
            (activity: IActivity) => {
                if (activity.userId === user.id) {
                    updateOwnActivity(activity);
                } else {
                    updateForeignActivity(activity);
                }
            }
        );
        return () => {
            activityHubConnection.off(hubs.activities.onUpdate);
        };
    }, [foreignActivities, ownActivities, updateForeignActivity, updateOwnActivity]);

    useEffect(() => {
        activityHubConnection.on(
            hubs.activities.newApplicant,
            (application: IActivityRequest) => {
                let activity: ContextActivity | undefined = foreignActivities.find(
                    a => a.id === application.activityId
                );
                if (activity) {
                    addApplicantId(activity, application.applicantId);
                    updateForeignActivity({...activity} as IForeignActivity);
                } else {
                    activity = ownActivities.find((a) => a.id === application.activityId);
                    if (activity) {
                        addApplicantId(activity, application.applicantId);
                        updateOwnActivity({...activity});
                    }
                }
            }
        );
        return () => {
            activityHubConnection.off(hubs.activities.newApplicant);
        };
    }, [
        ownActivities, 
        foreignActivities, 
        addApplicantId, 
        updateForeignActivity, 
        updateOwnActivity
    ]);

    useEffect(() => {
        activityHubConnection.on(
            hubs.activities.newActivity,
            (activity: IForeignActivity) => {
                fetchOwnActivities();
                fetchForeignActivities();
            }
        );
        return () => {
            activityHubConnection.off(hubs.activities.newActivity);
        };
    }), [foreignActivities, ownActivities, fetchOwnActivities, fetchForeignActivities];
    

    activityHubConnection.onclose((error) => {
        let notConnected = true;
        let waitingPeriod = 0;
        const userInfo = "Please wait while we are are trying to reconnect."
        if (error) {
            setErrorMessage(error.message + "\n" + userInfo);
        } else {
            setErrorMessage("We have websocket-connection problems. " + userInfo);
        }
        
        while (notConnected) {
            setTimeout(() => {
                activityHubConnection
                    .start()
                    .then(() => {
                        alert("Success: we are connected again!");
                        notConnected = false;
                    })
                    .catch((err: Error) => waitingPeriod = waitingPeriod + 500);
            }, waitingPeriod);
        }
        
    });

    const contextValue: ActivityContextModel = {
        isLoadingOwn,
        isLoadingForeign,
        ownActivities,
        foreignActivities,
        unhandledApplications,
        updateOwnActivity: updateOwnActivity,
        fetchOwnActivities: fetchOwnActivities,
        fetchForeignActivities: fetchForeignActivities,
        hideActivity: hideActivity,
        applyToActivity: applyToActivity
    };

    return (
        <ActivityContext.Provider value={contextValue}>
            {props.children}
        </ActivityContext.Provider>
    );
}
