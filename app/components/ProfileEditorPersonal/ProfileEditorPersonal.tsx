import React, { useContext, useState } from 'react'
import ProfilePersonalInfoForm from '../ProfilePersonalInfoForm/ProfilePersonalInfoForm'
import { INewUserProfile, IUserProfile } from '../../models/User/UserProfile'
import { SessionContext } from '../../context/SessionContext/SessionContext'
import { ApiClient } from '../../api/ApiClient'
import { getServiceUrl } from '../../api/channels'
import { useNavigation } from '@react-navigation/native'
import { RouteName } from '../../navigation/Navigation.config'

const UserProfileApi = new ApiClient<IUserProfile>({
    baseURL: getServiceUrl("UserProfiles")
})

const ProfileEditorPersonal = () => {
    const session = useContext(SessionContext);
    const userProfile = useState(session.userProfile)[0];
    const navigation = useNavigation();

    const onSubmit = async (newUserProfile: INewUserProfile) => {
        let user = { ...session.userProfile };
        Object.keys(newUserProfile).forEach(i => {
            if(Object.getOwnPropertyNames(user).includes(i)) {
                (user as any)[i] = (newUserProfile as any)[i]
            }
        })
        await UserProfileApi.Update<number, IUserProfile>(user, user.userId)
        .then(res => {
            if(res.error) {
                console.error(res.error);
            } else {
                session.setUserProfile(user);
                navigation.navigate(RouteName.Profile.About);
            }
        }).catch(err => console.error(err));
    }
    
    return (
        <ProfilePersonalInfoForm
            onSubmit={onSubmit} submitTitle={"change"} title="bearbeiten" 
            defaultValues={{
                birthDate: userProfile.birthDate, city: userProfile.city, 
                firstname: userProfile.firstname, lastname: userProfile.lastname,
                gender: userProfile.sex, username: userProfile.username
            }}/>
    )
}

export default ProfileEditorPersonal
