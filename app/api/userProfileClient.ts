import { MutableRefObject, useRef } from "react";
import { round } from "react-native-reanimated";
import { IUserAvatar } from "../models/UserAvatar";
import { INewUserProfile, IUserProfile } from "../models/UserProfile";
import { apiRoutes } from "./channels";
import useHttpClient from "./httpClient";

interface ReturnValue {
    createProfile: (user: INewUserProfile) => Promise<IUserProfile>;
    getProfileByUserId: (userId: string) => Promise<IUserProfile>;
    getProfileByUsername: (username: string) => Promise<IUserProfile>;
    getUserProfile: () => Promise<IUserProfile>;
    updateProfile: (user: IUserProfile) => Promise<void>;
    getAvatar: (userId: string) => Promise<IUserAvatar>;
    getAvatars: (userIds: string[]) => Promise<IUserAvatar[]>;
}

export function useUserProfileClient(token: MutableRefObject<string>, onExpiredToken: () => Promise<void>) : ReturnValue {
    
    const httpClient = useHttpClient<IUserProfile>({
        config: {baseURL: apiRoutes.userProfiles()}, 
        token,
        onExpiredToken
    });

    const createProfile = (userProfile: INewUserProfile): Promise<IUserProfile> =>
        httpClient.create<IUserProfile, INewUserProfile>(userProfile);

    const getUserProfile = (): Promise<IUserProfile> =>
        httpClient.get<IUserProfile>();

    const getProfileByUserId = (userId: string): Promise<IUserProfile> =>
        httpClient.get<IUserProfile>(userId);

    const getProfileByUsername = (username: string): Promise<IUserProfile> =>
        httpClient.get<IUserProfile>(apiRoutes.userProfiles("username/") + username);

    const getAvatar = (userId: string): Promise<IUserAvatar> =>
        httpClient.get<IUserAvatar>(apiRoutes.userProfiles("user-avatar/") + userId);

    const getAvatars = (userIds: string[]): Promise<IUserAvatar[]> =>
        httpClient.post<IUserAvatar[], string[]>(
            apiRoutes.userProfiles("user-avatars"), 
            userIds
        );

    const updateProfile = (userProfile: IUserProfile): Promise<void> =>
        httpClient.update<void, IUserProfile>(userProfile);

    return ({
        createProfile,
        getAvatar,
        getAvatars,
        getUserProfile,
        getProfileByUserId,
        getProfileByUsername,
        updateProfile,
    });
}