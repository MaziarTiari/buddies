import React, { useContext } from 'react'
import { ApiClient } from '../../api/ApiClient';
import { IUserProfile, INewUserProfile } from '../../models/User/UserProfile';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { CONFLICT } from 'http-status-codes';
import ProfilePersonalInfoForm from '../ProfilePersonalInfoForm/ProfilePersonalInfoForm'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { getServiceUrl } from '../../api/channels';
import { AuthenticationStatus } from '../../../App';

const UserProfileApi = new ApiClient<IUserProfile>(
    { baseURL: getServiceUrl("UserProfiles") }
);

interface CreateProfileFormProps {
    onSubmit: (status: AuthenticationStatus) => void;    
}

const CreateProfileForm = (Props: CreateProfileFormProps) => {
    const session = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);

    const onSubmit = async (newUserProfile: INewUserProfile) => {
        await UserProfileApi.Post<IUserProfile, INewUserProfile>(newUserProfile)
        .then(res => {
            if(res.data && !res.error) {
                session.setUserProfile(res.data);
                Props.onSubmit("profile_created");
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
            onSubmit={onSubmit} buttonTitle={translations.createProfile.submit_button}
            title={translations.ScreenHeading.createProfile}/>
    );
}

export default CreateProfileForm
