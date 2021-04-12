import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { AuthState, secureStoreKeys } from '../../context/SessionContext/sessionContextModel';
import Form, { IFormField, InputType } from '../Form/Form';
import { AxiosError } from 'axios';
import { getItemAsync, setItemAsync } from 'expo-secure-store';

const LoginForm = () => {

    const { translations } = useContext(LanguageContext);
    const { loginUser, setAuthState, setIsLoading } = useContext(SessionContext);
    const [loginErrorMsg, setLoginErrorMsg] = useState<string|undefined>();

    enum Field { EMAIL, PASSWORD };

    const fieldList: IFormField[] = [];

    fieldList[Field.EMAIL] = {
        inputType: InputType.TEXT,
        required: true,
        validationType: "email",
        placeholder: translations.email,
        icon: "email",
        errorMessage: loginErrorMsg
    };

    fieldList[Field.PASSWORD] = {
        inputType: InputType.TEXT,
        required: true,
        hideInput: true,
        placeholder: translations.password,
        icon: "onepassword",
    };

    const onSubmit = async (data: string[]) => {
        await setItemAsync(secureStoreKeys.email, data[Field.EMAIL]);
        await setItemAsync(secureStoreKeys.password, data[Field.PASSWORD]);
        loginUser(data[Field.EMAIL].trim(), data[Field.PASSWORD])
            .then(() => {
                setLoginErrorMsg(undefined);
            })
            .catch((error: AxiosError) => {
                setLoginErrorMsg(translations.wrong_login);
            })
    };

    return (
        <Form
            linkLabel={translations.register}
            onLink={() => setAuthState(AuthState.UNREGISTERED)}
            buttonTitle={translations.login}
            onSubmit={onSubmit}
            heading={translations.please_log_in}
            fieldList={fieldList}
        />
    );
}

export default LoginForm;
