export type BuddiesResource =  'Users' | 'UserProfiles';

export const getServiceUrl = ( resource: BuddiesResource): string => {
    return 'http://localhost:5000/api/' + resource + "/";
}

const serviceEndpoints = {
    Users: {
        login: "login/",
    },
    UserProfiles: {
        username: "username/"
    }
}