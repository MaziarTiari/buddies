import React, { useState, useContext } from 'react'
import FormInput from '../FormInput/FormInput';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import {userApi} from '../../api/User/UserApi';
import { AuthenticationStatus } from '../../../App';
import FormWithRequest from '../FormWithRequest/FormWithRequest';
import { ApiClient } from '../../api/ApiClient';
import { IUserProfile } from '../../models/User/UserProfile';
import { getServiceUrl } from '../../api/channels';
import { AxiosError } from 'axios';
import { NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';

const initialFormStatus = {
    email: false,
    password: false
}

interface LoginFormProps {
    onSubmit: (status: AuthenticationStatus) => void;
}

const userProfileApi = 
    new ApiClient<IUserProfile>({ baseURL: getServiceUrl("UserProfiles") });

const LoginForm = (Props: LoginFormProps) => {

    const [responceError, setResponceError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatus, setErrorStatus] = useState<typeof initialFormStatus>(
        initialFormStatus);
    const [verify, setVerify] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const { translations } = useContext(LanguageContext);
    const session = useContext(SessionContext);

    const setErrorsToDefault = () => {
        setVerify(false);
        setShowEmailError(false);
        setShowPasswordError(false);
    }

    const validateForm = (): boolean => {
        setErrorsToDefault();
        let isValid = true;
        Object.keys(errorStatus).forEach(key => {
            if((errorStatus as any)[key] === true) isValid = false;
        });
        return isValid;
    }

    const onSubmit = async () => {
        const formIsValid = await validateForm();
        if(!formIsValid) {
            setVerify(true); 
            return;
        }

        try {
            const user = await userApi.VerifyUser({ email: email, password: password });
            session.setUser(user);
            try {
                const userProfile = await userProfileApi.Get<IUserProfile>(user.id);
                session.setUserProfile(userProfile);
                return Props.onSubmit("login");
            } catch (error) {
                Props.onSubmit("create_profile");
            }
        } catch(error) {
            if((error as AxiosError).response?.status === NOT_FOUND)
                return setResponceError(translations.login.errorMessages.email);
            else if((error as AxiosError).response?.status === UNAUTHORIZED)
                return setResponceError(translations.login.errorMessages.password);
            else
                return setResponceError(translations.apiRequestError.responceError);
        }
    }

    return (
        <FormWithRequest
            linkLabel={translations.register.submit_button} 
            onLink={() => Props.onSubmit(null)}
            buttonTitle={translations.login.submit_button} onSubmit={onSubmit}
            heading={translations.ScreenHeading.login} responseError={responceError}>
            <FormInput
                type="email" required 
                errorStatusChange={
                    err => setErrorStatus({...errorStatus, email: err})
                }
                showErrorMessage={showEmailError}
                errorMessage={translations.login.errorMessages.email}
                verify={verify}
                onChangeText={setEmail}
                placeholder={translations.profile.email}/>
            <FormInput
                type="password"
                errorMessage={translations.login.errorMessages.password}
                required errorStatusChange={
                    err => setErrorStatus({...errorStatus, password: err})
                }
                showErrorMessage={showPasswordError}
                verify={verify}
                onChangeText={setPassword}
                placeholder={translations.register.password}/>
        </FormWithRequest>
    )
}

export default LoginForm
