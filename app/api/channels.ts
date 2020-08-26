export type BuddiesResource = (
    'Users' | 'UserProfiles' | 'Users/login' | 'Categories' | 'Activities' | 
    'Activities/user' | 'Activities/apply'
);

export const baseUrl = "http://80.132.214.69/";
export const baseApiUrl = baseUrl + "api/";
export const getServiceUrl = (resource: BuddiesResource): string => {
    return baseApiUrl + resource + "/";
}

export const hubs = {
    activities: "activityHub",
    user: "userHub"
}