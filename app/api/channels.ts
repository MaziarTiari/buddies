export type BuddiesResource = (
    'Users' | 'UserProfiles' | 'Users/login' | 'Categories' | 'Activities' | 
    'Activities/user' | 'Activities/apply'
);

export const baseUrl = "http://192.168.2.126:5000/";
export const baseApiUrl = baseUrl + "api/";
export const getServiceUrl = (resource: BuddiesResource): string => {
    return baseApiUrl + resource + "/";
}

export const hubs = {
    activities: "activityHub",
    user: "userHub"
}