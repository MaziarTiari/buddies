import React, { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import ProfilePersonalInfoForm from '../ProfilePersonalInfoForm/ProfilePersonalInfoForm';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';

const CreateProfileForm = () => {

    const { createUserProfile, createUserProfileError, createUserProfileIsLoading } = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);

    return (
        <ProfilePersonalInfoForm
            responseError={createUserProfileError}
            onSubmit={createUserProfile}
            buttonTitle={translations.createProfile.submit_button}
            title={translations.ScreenHeading.createProfile}
        />
    );
};

export default CreateProfileForm;
