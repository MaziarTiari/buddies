import React, { useContext } from 'react'
import moment from 'moment';
import { ApiClient } from '../../api/ApiClient';
import { IUserProfile, INewUserProfile } from '../../models/User';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { CONFLICT } from 'http-status-codes';
import ProfilePersonalInfoForm from '../ProfilePersonalInfoForm/ProfilePersonalInfoForm'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { getServiceUrl } from '../../api/channels';

const UserProfileApi = new ApiClient<IUserProfile>(
    { baseURL: getServiceUrl("UserProfiles") }
);

interface CreateProfileFormProps {
    onSubmit: () => void;    
}

const CreateProfileForm = (Props: CreateProfileFormProps) => {
    const session = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);

    const onSubmit = async (newUserProfile: INewUserProfile) => {
        await UserProfileApi.Post<IUserProfile, INewUserProfile>(newUserProfile)
        .then(res => {
            if(res.data && !res.error) {
                session.setUserProfile(res.data);
                Props.onSubmit();
            }
            else {
                if(res.error?.status === CONFLICT) {
                    console.error(res.error);
                } else console.error(res.error)
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <ProfilePersonalInfoForm 
            onSubmit={onSubmit} submitTitle={translations.createProfile.submit_button}
            title={translations.ScreenHeading.createProfile}/>
    );
}

export default CreateProfileForm
