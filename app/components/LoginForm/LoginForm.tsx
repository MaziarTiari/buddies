import React, { useState, useContext } from 'react'
import FormInput from '../FormInput/FormInput';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import FormWithRequest from '../FormWithRequest/FormWithRequest';
import { AuthState } from '../../context/SessionContext/stateFrame';

const initialFormStatus = {
    email: false,
    password: false
}

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatus, setErrorStatus] = useState<typeof initialFormStatus>(
        initialFormStatus);
    const [verify, setVerify] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const { translations } = useContext(LanguageContext);
    const { loginUser, loginUserIsLoading, loginUserError, setAuthState } = useContext(SessionContext);

    const setErrorsToDefault = () => {
        setVerify(false);
        setShowEmailError(false);
        setShowPasswordError(false);
    }

    const validateForm = (): boolean => {
        setErrorsToDefault();
        let isValid = true;
        Object.keys(errorStatus).forEach(key => {
            if ((errorStatus as any)[key] === true) isValid = false;
        });
        return isValid;
    }

    const onSubmit = async () => {
        const formIsValid = validateForm();
        if (!formIsValid) {
            setVerify(true);
            return;
        }
        loginUser(email, password);
    }

    return (
        <FormWithRequest
            linkLabel={translations.register.submit_button}
            onLink={() => setAuthState(AuthState.UNREGISTERED)}
            buttonTitle={translations.login.submit_button}
            onSubmit={onSubmit}
            heading={translations.ScreenHeading.login}
            responseError={loginUserError}>
            <FormInput
                type="email" required
                errorStatusChange={
                    err => setErrorStatus({ ...errorStatus, email: err })
                }
                showErrorMessage={showEmailError}
                errorMessage={translations.login.errorMessages.email}
                verify={verify}
                onChangeText={setEmail}
                placeholder={translations.profile.email} />
            <FormInput
                type="password"
                errorMessage={translations.login.errorMessages.password}
                required errorStatusChange={
                    err => setErrorStatus({ ...errorStatus, password: err })
                }
                showErrorMessage={showPasswordError}
                verify={verify}
                onChangeText={setPassword}
                placeholder={translations.register.password} />
        </FormWithRequest>
    )
}

export default LoginForm
