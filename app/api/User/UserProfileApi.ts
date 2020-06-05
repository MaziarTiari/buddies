// import { ApiClient } from '../ApiClient'
// import { IUserProfile, INewUserProfile } from '../../models/User/UserProfile'
// import { getServiceUrl } from '../channels'
// import { Api } from '../Api';
// import { AxiosRequestConfig } from 'axios';

// // const UserProfileApi = new ApiClient<IUserProfile>(
// //     {baseURL: getServiceUrl("UserProfiles")}
// // );

// //const api = new Api({baseURL: getServiceUrl("UserProfiles")});

// class UserProfileApi extends ApiClient<IUserProfile> {

//     constructor(config: AxiosRequestConfig) {
//         super(config);
//     }

    
    
//     const getUserProfile = async (userId: string) => {
//         try {
//             const result = await UserProfileApi.Get(userId);
//             if(result.data?.id) return result.data;
//             else throw result.error;
//         } catch(err) {
//             throw err;
//         }
//     }

//     return { getUserProfile }
// }

// export default useUserProfileApi
