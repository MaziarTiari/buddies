import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useUserProfileClient } from '../../api/userProfileClient';
import { defaultUserAvatar, IUserAvatar } from '../../models/UserAvatar';
import { IUserProfile } from '../../models/UserProfile';
import { SessionContext } from '../SessionContext/SessionContext';
import { defaultUserProfile } from '../SessionContext/sessionContextModel';

interface ProfileContextModel {
    getUserProfile: (userId: string) => Promise<IUserProfile>;
    subjectsProfile: IUserProfile;
    fetchAvatar: (userId: string) => Promise<IUserAvatar>;
    fetchAvatars: (userIds: string[]) => Promise<IUserAvatar[]>;
    userAvatars: IUserAvatar[];
}

const initState: ProfileContextModel = {
    getUserProfile: async () => defaultUserProfile,
    subjectsProfile: defaultUserProfile,
    fetchAvatar: async () => defaultUserAvatar,
    fetchAvatars: async () => [],
    userAvatars: [],
}

export const ProfileContext = createContext(initState);

export default function ProfileContextProvider(props: { children: ReactNode }) {
    const { 
        token, 
        authenticate, 
        userProfile: subjectsProfile } = useContext(SessionContext);
    const userProfileClient = useUserProfileClient(token, authenticate)
    const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);
    const [userAvatars, setUserAvatars] = useState<IUserAvatar[]>([])

    async function getAvatar(userId: string): Promise<IUserAvatar> {
        const avatar = userAvatars.find(a => a.userId === userId);
        if (avatar) {
            return avatar;
        }
        return userProfileClient.getAvatar(userId).then(res => {
            setUserAvatars([...userAvatars, res]);
                return res;
        });    
    }

    async function getAvatars(userIds: string[]) {
        const idsWithRes: string[] = [];
        let idsWithNoRes : string[] = [];;
        const avatars = userAvatars.filter(a => {
            if (userIds.includes(a.userId)) {
                idsWithRes.push(a.userId);
                return a;
            }
        });
        if (idsWithRes.length > 0 && idsWithRes.length === userIds.length) {
            return avatars;
        } 
        idsWithNoRes = userIds.filter(id => !idsWithRes.includes(id));
        return userProfileClient.getAvatars(idsWithNoRes).then(res => {
            setUserAvatars([...userAvatars, ...res]);
            return res;
        })
    }

    async function getUserProfile(userId: string) {
        const profile = userProfiles.find(p => p.userId === userId);
        if (profile) {
            return profile;
        }
        return userProfileClient.getProfileByUserId(userId);
    }

    const value: ProfileContextModel = {
        fetchAvatar: getAvatar,
        fetchAvatars: getAvatars,
        subjectsProfile,
        getUserProfile,
        userAvatars
    }

    return (
        <ProfileContext.Provider value={value}>
            {props.children}
        </ProfileContext.Provider>
    );
}