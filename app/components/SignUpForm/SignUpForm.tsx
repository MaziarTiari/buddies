import React, { useContext, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { INewUser } from '../../models/User';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { AuthState } from '../../context/SessionContext/stateFrame';
import Form, { IFormField, InputType } from '../Form/Form';

const SignUpForm = () => {

    const { createUser, createUserError, setAuthState } = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);

    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

    enum Field { EMAIL, PHONE, PASSWORD, REPEAT_PASSWORD };

    const fieldList: IFormField[] = [];

    fieldList[Field.EMAIL] = {
        inputType: InputType.TEXT,
        initialValue: "",
        validationType: "email",
        icon: "email",
        required: true,
        placeholder: translations.profile.email,
    };

    fieldList[Field.PHONE] = {
        inputType: InputType.TEXT,
        initialValue: "",
        validationType: "phone",
        icon: "cellphone",
        required: true,
        placeholder: translations.profile.phone
    };

    fieldList[Field.PASSWORD] = {
        inputType: InputType.TEXT,
        initialValue: "",
        hideInput: true,
        icon: "onepassword",
        required: true,
        placeholder: translations.register.password,
    };

    fieldList[Field.REPEAT_PASSWORD] = {
        inputType: InputType.TEXT,
        initialValue: "",
        hideInput: true,
        icon: "onepassword",
        required: true,
        placeholder: translations.register.repeat_password,
    };

    const onSubmit = (data: string[]) => {
        if (data[Field.PASSWORD] !== data[Field.REPEAT_PASSWORD]) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
            const createdUser: INewUser = {
                email: data[Field.EMAIL],
                phone: data[Field.PHONE],
                password: data[Field.PASSWORD]
            };
            createUser(createdUser);
        }
    }

    return (
        <Form
            linkLabel={translations.login.submit_button}
            onLink={() => setAuthState(AuthState.UNAUTHORIZED)}
            buttonTitle={translations.register.submit_button}
            onSubmit={onSubmit}
            heading={translations.ScreenHeading.register}
            errorMessage={
                passwordMismatch
                    ? translations.register.errorMessage.password
                    : createUserError}
            fieldList={fieldList}
        />
    );
}

export default SignUpForm
