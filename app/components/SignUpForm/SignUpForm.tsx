import React, {useContext, useState, useEffect } from 'react';
import Container from '../Container/Container';
import { Headline } from 'react-native-paper';
import Button from '../Button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getResponsiveSize } from '../../utils/font/font';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import FormInput from '../FormInput/FormInput';
import useStyles from './SignUpForm.style';
import { ApiClient } from '../../api/ApiClient'
import { INewUser, IUser } from '../../models/User';
import { getServiceUrl } from '../../api/channels';
import { IForm, INITIAL_FORM, FormKey } from './constants';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import LinkLabel from '../LinkLabel/LinkLabel';
import HttpStatus from 'http-status-codes'

const userService = new ApiClient<IUser>({ baseURL: "http://localhost:5000/api/users" });
interface SignUpFormProps { 
    onSignedUp: (status: boolean) => void;
    onLogin: () => void;
}

const SignUpForm = (Props: SignUpFormProps) => {
    const [form, setForm] = useState<IForm>(INITIAL_FORM);
    const [verify, setVerify] = useState(false);
    const [emailErrorStatus, setEmailErrorStatus] = useState(false);
    const [phoneErrorStatus, setPhoneErrorStatus] = useState(false);
    const [passwordErrorStatus, setPasswordErrorStatus] = useState(false);
    const [repeatPasswordErrorStatus, setRepeatPasswordErrorStatus] = useState(false);
    const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);
    const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false);

    const user = useContext(SessionContext);
    const translations = useContext(LanguageContext).translations;
    const styles = useStyles();

    const setErrorMessagesToDefault = () => {
        setShowEmailErrorMessage(false);
        setShowPasswordErrorMessage(false);
        setVerify(false);
    }

    const validateForm = (): boolean => {
        setErrorMessagesToDefault();
        let isValid: boolean = true;
        if(emailErrorStatus || phoneErrorStatus 
                || passwordErrorStatus || repeatPasswordErrorStatus)
            isValid = false;
        if(form.password !== form.repeatPassword) {
            setShowPasswordErrorMessage(true);
            isValid = false;
        }
        return isValid;
    }

    const onSubmit = async () => {
        const formIsValid = validateForm();
        if(!formIsValid) { setVerify(true); return;}
        const newUser: INewUser = {
            email: form.email,
            phone: form.phone,
            password: form.password
        }
        await userService.Post<IUser, INewUser>(newUser)
        .then(res => {
            if(res.data && !res.error) {
                console.log(res.data)
                user.setUser(res.data);
                Props.onSignedUp(true);
            } else {
                if(res.error?.status === HttpStatus.CONFLICT) {
                    setShowEmailErrorMessage(true);
                }
                else console.error(res.error)
            }
        })
        .catch(err => console.error(err));
    }    
    
    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <KeyboardAwareScrollView 
                    resetScrollToCoords={{ x: 0, y: 0 }} enableOnAndroid
                    extraHeight={getResponsiveSize(20)} 
                    contentContainerStyle={styles.contentContainer}
                >
                    <Headline style={styles.heading}>
                        {translations.ScreenHeading.register}
                    </Headline>
                    <FormInput
                        errorMessage={translations.register.errorMessage.email}
                        errorStatusChange={setEmailErrorStatus}
                        showErrorMessage={showEmailErrorMessage} type="email" required
                        iconName="email" verify={verify}
                        onChangeText={txt => setForm({...form, [FormKey.email]: txt})}
                        placeholder={translations.profile.email}/>
                    <FormInput
                        errorStatusChange={setPhoneErrorStatus} type="phone" required
                        iconName="cellphone" verify={verify}
                        onChangeText={txt => setForm({...form, [FormKey.phone]: txt})}
                        placeholder={translations.profile.phone}/>
                    <FormInput 
                        errorStatusChange={setPasswordErrorStatus} type="password" 
                        errorMessage={translations.register.errorMessage.password}
                        showErrorMessage={showPasswordErrorMessage} required
                        iconName="onepassword" verify={verify}
                        onChangeText={txt => setForm({...form, [FormKey.password]: txt})}
                        placeholder={translations.register.password} secureTextEntry/>
                    <FormInput
                        errorStatusChange={setRepeatPasswordErrorStatus}
                        verify={verify} required iconName="onepassword" type="password" 
                        onChangeText={txt => 
                            setForm({...form, [FormKey.repeatPassword]: txt})}
                        placeholder={translations.register.repeat_password}/>
                    <Button 
                        onPress={onSubmit}
                        title={translations.register.submit_button} 
                        style={styles.submitButton}/>
                    <LinkLabel label="Anmelden" onPress={Props.onLogin}/>
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    );
}

export default SignUpForm
