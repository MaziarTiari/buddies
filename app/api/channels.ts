export type BuddiesResource =  'Users' | 'UserProfiles' | 'Users/login';

export const getServiceUrl = ( resource: BuddiesResource): string => {
    return 'http://40.113.114.86/api/' + resource + "/";
}