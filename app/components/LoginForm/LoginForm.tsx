import React, { useState, useContext } from 'react'
import Container from '../Container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getResponsiveSize } from '../../utils/font/font';
import { Headline } from 'react-native-paper';
import FormInput from '../FormInput/FormInput';
import useStyle from './LoginForm.style'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import Button from '../Button/Button';
import { IVerifyingUser, IUser } from '../../models/User';
import { ApiClient } from '../../api/ApiClient';
import { ProfileContext } from '../../context/ProfileContext/ProfileContext';
import HttpStatus from 'http-status-codes'
import LinkLabel from '../LinkLabel/LinkLabel';

interface LoginFormProps { 
    onSuccess: () => void;
    onRegister: () => void;
}

const initialFormStatus = {
    email: false,
    password: false
}

const Api = new ApiClient<IVerifyingUser>({baseURL: "http://localhost:5000/api/users/login"})
const LoginForm = ({ onSuccess, onRegister }: LoginFormProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatus, setErrorStatus] = useState<typeof initialFormStatus>(
        initialFormStatus)
    const [verify, setVerify] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    
    const styles = useStyle();
    const { translations } = useContext(LanguageContext);
    const user = useContext(ProfileContext);

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
        if(!formIsValid) {setVerify(true); return}
        const verifyingUser: IVerifyingUser = { email: email, password: password};
        await Api.Post<IUser,IVerifyingUser>(verifyingUser)
        .then(res => {
            if(res.error) {
                if(res.error.status === HttpStatus.UNAUTHORIZED)
                    setShowPasswordError(true)
                if(res.error.status === HttpStatus.NOT_FOUND)
                    setShowEmailError(true);
                return res;
            }
            if(res.data) {
                user.setUser(res.data);
                onSuccess();
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
                        {translations.ScreenHeading.login}
                    </Headline>
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
                        errorMessage={translations.login.errorMessages.password}
                        required errorStatusChange={
                            err => setErrorStatus({...errorStatus, password: err})
                        }
                        showErrorMessage={showPasswordError}
                        verify={verify}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder={translations.register.password}/>
                    <Button
                        onPress={onSubmit}
                        title={translations.login.submit_button} 
                        style={styles.submitButton}/>
                    <LinkLabel 
                        onPress={onRegister} label={translations.register.submit_button}/>
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    )
}

export default LoginForm
