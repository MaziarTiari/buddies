import React, { useContext, useState } from 'react'
import ProfilePersonalInfoForm from '../ProfilePersonalInfoForm/ProfilePersonalInfoForm'
import { INewUserProfile } from '../../models/UserProfile'
import { SessionContext } from '../../context/SessionContext/SessionContext'
import { useNavigation } from '@react-navigation/native'
import { RouteName } from '../../navigation/Navigation.config'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'

const ProfileEditorPersonal = () => {
    const { userProfile, updateUserProfile } = useContext(SessionContext);
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);

    navigation.setOptions({ title: translations.profile.personal_info_edit });

    const onSubmit = async (newUserProfile: INewUserProfile) => {
        let user = { ...userProfile };
        Object.keys(newUserProfile).forEach(i => {
            if (Object.getOwnPropertyNames(user).includes(i)) {
                (user as any)[i] = (newUserProfile as any)[i]
            }
        })
        updateUserProfile(user);
        navigation.navigate(RouteName.Profile.About);
    }

    return (
        <ProfilePersonalInfoForm // TODO change hard coded titles
            responseError={undefined} // TODO Error Message
            onSubmit={onSubmit} buttonTitle={"change"}
            defaultValues={{
                birthDate: userProfile.birthDate,
                city: userProfile.city,
                firstname: userProfile.firstname,
                lastname: userProfile.lastname,
                gender: userProfile.sex,
                username: userProfile.username
            }} />
    )
}

export default ProfileEditorPersonal
