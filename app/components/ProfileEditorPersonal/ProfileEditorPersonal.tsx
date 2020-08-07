import React, { useContext, useState } from 'react'
import ProfilePersonalInfoForm from '../ProfilePersonalInfoForm/ProfilePersonalInfoForm'
import { INewUserProfile, IUserProfile } from '../../models/User/UserProfile'
import { SessionContext } from '../../context/SessionContext/SessionContext'
import { ApiClient } from '../../api/ApiClient'
import { getServiceUrl } from '../../api/channels'
import { useNavigation } from '@react-navigation/native'
import { RouteName } from '../../navigation/Navigation.config'
import { METHOD_NOT_ALLOWED, NO_CONTENT, NOT_FOUND } from 'http-status-codes'
import { AxiosError } from 'axios'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'

const UserProfileApi = new ApiClient<IUserProfile>({
    baseURL: getServiceUrl("UserProfiles")
})

const ProfileEditorPersonal = () => {
    const session = useContext(SessionContext);
    const userProfile = useState(session.userProfile)[0];
    const [responseError, setResponseError] = useState("");
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);

    const onSubmit = async (newUserProfile: INewUserProfile) => {
        let user = { ...session.userProfile };
        Object.keys(newUserProfile).forEach(i => {
            if (Object.getOwnPropertyNames(user).includes(i)) {
                (user as any)[i] = (newUserProfile as any)[i]
            }
        })
        session.updateUserProfile(user);
        navigation.navigate(RouteName.Profile.About);
    }

    return (
        <ProfilePersonalInfoForm // TODO change hard coded titles
            responseError={responseError}
            onSubmit={onSubmit} buttonTitle={"change"}
            defaultValues={{
                birthDate: userProfile.birthDate, city: userProfile.city,
                firstname: userProfile.firstname, lastname: userProfile.lastname,
                gender: userProfile.sex, username: userProfile.username
            }} />
    )
}

export default ProfileEditorPersonal
