import React, { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { AuthState } from '../../context/SessionContext/stateFrame';
import Form, { IFormField, InputType } from '../Form/Form';

const LoginForm = () => {

    const { translations } = useContext(LanguageContext);
    const { loginUser, loginUserError, setAuthState } = useContext(SessionContext);

    enum Field { EMAIL, PASSWORD };

    const fieldList: IFormField[] = [];

    fieldList[Field.EMAIL] = {
        inputType: InputType.TEXT,
        required: true,
        validationType: "email",
        placeholder: translations.profile.email,
        icon: "email",
    };

    fieldList[Field.PASSWORD] = {
        inputType: InputType.TEXT,
        required: true,
        hideInput: true,
        placeholder: translations.register.password,
        icon: "onepassword",
    };

    const onSubmit = (data: string[]) => {
        loginUser(data[Field.EMAIL], data[Field.PASSWORD]);
    };

    return (
        <Form
            linkLabel={translations.register.submit_button}
            onLink={() => setAuthState(AuthState.UNREGISTERED)}
            buttonTitle={translations.login.submit_button}
            onSubmit={onSubmit}
            heading={translations.ScreenHeading.login}
            errorMessage={loginUserError}
            fieldList={fieldList}
        />
    );
}

export default LoginForm;
