import React, { useContext, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import FormInput from '../FormInput/FormInput';
import { INewUser, IUser } from '../../models/User';
import { IForm, INITIAL_FORM, FormKey } from './constants';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import FormWithRequest from '../FormWithRequest/FormWithRequest';
import { AuthState } from '../../context/SessionContext/stateFrame';

const SignUpForm = () => {
    const [form, setForm] = useState<IForm>(INITIAL_FORM);
    const [verify, setVerify] = useState(false);
    const [emailErrorStatus, setEmailErrorStatus] = useState(false);
    const [phoneErrorStatus, setPhoneErrorStatus] = useState(false);
    const [passwordErrorStatus, setPasswordErrorStatus] = useState(false);
    const [repeatPasswordErrorStatus, setRepeatPasswordErrorStatus] = useState(false);
    const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);
    const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false);

    const { createUser, createUserIsLoading, createUserError, setAuthState } = useContext(SessionContext);
    const translations = useContext(LanguageContext).translations;

    const setErrorMessagesToDefault = () => {
        setShowEmailErrorMessage(false);
        setShowPasswordErrorMessage(false);
        setVerify(false);
    }

    const validateForm = (): boolean => {
        setErrorMessagesToDefault();
        let isValid: boolean = true;
        if (emailErrorStatus || phoneErrorStatus
            || passwordErrorStatus || repeatPasswordErrorStatus)
            isValid = false;
        if (form.password !== form.repeatPassword) {
            setShowPasswordErrorMessage(true);
            isValid = false;
        }
        return isValid;
    }

    const onSubmit = async () => {
        const formIsValid = validateForm();
        if (!formIsValid) { setVerify(true); return; }
        const newUser: INewUser = {
            email: form.email,
            phone: form.phone,
            password: form.password
        }
        createUser(newUser);
    }

    return (
        <FormWithRequest
            linkLabel={translations.login.submit_button}
            onLink={() => setAuthState(AuthState.UNAUTHORIZED)}
            buttonTitle={translations.register.submit_button}
            onSubmit={onSubmit}
            heading={translations.ScreenHeading.register}
            responseError={createUserError}>
            <FormInput
                errorMessage={translations.register.errorMessage.email}
                errorStatusChange={setEmailErrorStatus}
                showErrorMessage={showEmailErrorMessage} type="email" required
                iconName="email" verify={verify}
                onChangeText={txt => setForm({ ...form, [FormKey.email]: txt })}
                placeholder={translations.profile.email} />
            <FormInput
                errorStatusChange={setPhoneErrorStatus} type="phone" required
                iconName="cellphone" verify={verify}
                onChangeText={txt => setForm({ ...form, [FormKey.phone]: txt })}
                placeholder={translations.profile.phone} />
            <FormInput
                errorStatusChange={setPasswordErrorStatus} type="password"
                errorMessage={translations.register.errorMessage.password}
                showErrorMessage={showPasswordErrorMessage} required
                iconName="onepassword" verify={verify}
                onChangeText={txt => setForm({ ...form, [FormKey.password]: txt })}
                placeholder={translations.register.password} secureTextEntry />
            <FormInput
                errorStatusChange={setRepeatPasswordErrorStatus}
                verify={verify} required iconName="onepassword" type="password"
                onChangeText={txt =>
                    setForm({ ...form, [FormKey.repeatPassword]: txt })}
                placeholder={translations.register.repeat_password} />
        </FormWithRequest>
    );
}

export default SignUpForm
