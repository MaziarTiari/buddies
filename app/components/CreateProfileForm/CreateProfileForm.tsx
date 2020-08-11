import React, { useContext, useState } from 'react'
import { ApiClient } from '../../api/ApiClient';
import { IUserProfile, INewUserProfile } from '../../models/UserProfile';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { CONFLICT } from 'http-status-codes';
import ProfilePersonalInfoForm from '../ProfilePersonalInfoForm/ProfilePersonalInfoForm'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { getServiceUrl } from '../../api/channels';
import { AuthenticationStatus } from '../../../App';
import { AxiosError } from 'axios';

const userProfileApi =
    new ApiClient<IUserProfile>({ baseURL: getServiceUrl("UserProfiles") });

interface CreateProfileFormProps {
    onSubmit: (status: AuthenticationStatus) => void;
}

const CreateProfileForm = (Props: CreateProfileFormProps) => {
    const session = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);
    const [responseError, setResponseError] = useState("");

    const onSubmit = async (newUserProfile: INewUserProfile) => {
        await userProfileApi.Create<IUserProfile, INewUserProfile>(newUserProfile)
            .then(res => {
                session.setUserProfile(res);
                Props.onSubmit("profile_created");
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === CONFLICT)
                    setResponseError(
                        translations.createProfile.errorMessage.username.conflict)
                else
                    setResponseError(translations.apiRequestError.responceError);
            });
    }

    return (
        <ProfilePersonalInfoForm
            responseError={responseError}
            onSubmit={onSubmit} buttonTitle={translations.createProfile.submit_button}
            title={translations.ScreenHeading.createProfile} />
    );
}

export default CreateProfileForm
