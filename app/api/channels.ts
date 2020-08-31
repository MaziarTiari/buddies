export type BuddiesResource = (
    'Users' | 'UserProfiles' | 'Users/login' | 'Categories' | 'Activities' |
    'PhotoGalleries' | 'PhotoGalleries/addImage'
);

export const apiResources = {
    activities: {
        fromUser: (userId: string) => "user/" + userId,
        apply: "apply/",
        notFromUser: (userId: string) => "exclude/" + userId,
        hide: "hide/"
    },
    user: {
        getAvatars: "getUserAvatars"
    }
}

export const baseUrl = "http://40.113.114.86/";
export const baseApiUrl = baseUrl + "api/";
export const getServiceUrl = (resource: BuddiesResource): string => {
    return baseApiUrl + resource + "/";
}

export const hubs = {
    activities: {
        connection: "activityHub",
        subscribeUser: "addToActivityUserGroup",
        onUpdate: "updateActivity",
        newApplicant: "newApplicant",
        newActivity: "newActivity",
        subscribeMany: "addToActivityGroups",
        unsubscribe: "removeFromActivityGroup"
    },
    user: "userHub"
}