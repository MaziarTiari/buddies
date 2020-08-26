export type BuddiesResource = (
    'Users' | 'UserProfiles' | 'Users/login' | 'Categories' | 'Activities' |
    'Activities/user' | 'Activities/apply' | 'PhotoGalleries' | 'PhotoGalleries/addImage'
);

export const baseUrl = "http://40.113.114.86/";
export const baseApiUrl = baseUrl + "api/";
export const getServiceUrl = (resource: BuddiesResource): string => {
    return baseApiUrl + resource + "/";
}

export const hubs = {
    activities: "activityHub",
    user: "userHub"
}