export type BuddiesResource =  'Users' | 'UserProfiles' | 'Users/login' | 'Categories';

export const baseApiUrl = 'http://40.113.114.86/api/'
export const getServiceUrl = ( resource: BuddiesResource): string => {
    return baseApiUrl + resource + "/";
}