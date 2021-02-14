export type BuddiesResource = (
    'Users/' | 'UserProfiles/' | 'Categories/' | 'Activities/' | 'PhotoGalleries/'
);

const getResourceUrl = (resource: BuddiesResource) => baseApiUrl + resource;

type UserServiceActions = "authenticate" | "change-password";
type UserProfileServiceActions = "username/" | "user-avatar/" | "user-avatars";
type ActivityServiceActions = (
    "apply/" | "offers" | "hide/" | "members/" | "applicants/" | "accept/" | "reject/"
    | "my-activities"
);
type CategoryServiceActions = "addImage/";
type PhotoGalleriesActions = "my-gallery" | "addImage/"
type Action = (
    UserProfileServiceActions | UserServiceActions | ActivityServiceActions |
    CategoryServiceActions | PhotoGalleriesActions
);

const getApiRoute = (resource: BuddiesResource, action?: Action) => (
    action ? getResourceUrl(resource) + action : getResourceUrl(resource)
)

export const apiRoutes = {
    activities: (action?: ActivityServiceActions) => getApiRoute("Activities/", action),
    user: (action?: UserServiceActions) => getApiRoute("Users/", action),
    userProfiles: (action?: UserProfileServiceActions) => getApiRoute("UserProfiles/", action),
    categories: (action?:CategoryServiceActions) => getApiRoute("Categories/", action),
    photoGalleries: (action?: PhotoGalleriesActions) => getApiRoute("PhotoGalleries/", action),
}

export const baseUrl = "http://192.168.2.126:5000/";
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