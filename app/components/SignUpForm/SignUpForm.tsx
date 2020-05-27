import React, {useContext, useState } from 'react';
import { Text } from 'react-native';
import Container from '../Container/Container';
import { Headline } from 'react-native-paper';
import Button from '../Button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getResponsiveSize } from '../../utils/font/font';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { validateEmail, validatePhone } from '../../utils/generics/validate';
import FormInput from '../FormInput/FormInput';
import useStyles from './SignUpForm.style';
import { BackendService } from '../../api/ApiClient'
import { INewUser, IUser } from '../../models/User';

interface IForm {
    email: string;
    phone: string;
    password: string;
    repeatPassword: string;
}

const INITIAL_FORM: IForm = {
    email: "",
    phone: "",
    password: "",
    repeatPassword: ""
}

enum FormKey {
    email = "email",
    phone = "phone",
    password = "password",
    repeatPassword = "repeatPassword"
}

interface IShowErrowMessage {
    email: boolean;
    phone: boolean;
    password: boolean;
}

interface IFormErrorSatus extends IShowErrowMessage{
    repeatPassword: boolean;
}

const INITIAL_FORM_STATUS: IFormErrorSatus = {
    email: false,
    phone: false,
    password: false,
    repeatPassword: false,
}

const INITIAL_SHOW_ERROR_MSG: IShowErrowMessage = {
    email: false,
    phone: false,
    password: false,
}

const userService = new BackendService<IUser>(
    {
        baseURL: "http://40.113.114.86/api/Users",
    }
);

const INITIAL_ERROR_MESSAGES = {
    email: "",
    phone: "",
    password: ""
}

var incorrectInputs: number = 0;

const SignUpForm = () => {

    const translations = useContext(LanguageContext).translations;
    const [formErrorStatus, setFormErrorStatus] = useState<IFormErrorSatus>(INITIAL_FORM_STATUS);
    const [showErrorMessage, setShowErrorMessage] = useState<IShowErrowMessage>(INITIAL_SHOW_ERROR_MSG);
    const [form, setForm] = useState(INITIAL_FORM);

    const styles = useStyles();

    const setErrorMessagesToDefault = () => {
        setFormErrorStatus(INITIAL_FORM_STATUS);
        setShowErrorMessage(INITIAL_FORM_STATUS);
        incorrectInputs = 0;
    }

    const validateForm = (): boolean => {
        setErrorMessagesToDefault();
        let errors: any = {
            email: false,
            phone: false,
            password: false,
            repeatPassword: false,
        } as IFormErrorSatus;
        const result = () => incorrectInputs == 0;
        for(let [key, value] of Object.entries(form)) {
            if( isUndefinedOrEmpty(value) ) {
                errors[key] = true;
                incorrectInputs++;
            }
        }
        let tmp = validateInputPatterns(errors);
        if(tmp) errors = tmp;
        setFormErrorStatus(Object.assign({} ,errors))
        return result();
    }

    const isUndefinedOrEmpty = (string: string) => 
        !string || string === "" || string === " "

    
    const validateInputPatterns = (errors: any) => {
        let showErrorMessage: IShowErrowMessage = {
            email: false, password: false, phone: false
        };
        if(incorrectInputs === Object.keys(form).length) return;
        if( !isUndefinedOrEmpty(form.password) && !isUndefinedOrEmpty(form.repeatPassword)) {
            if (form.password !== form.repeatPassword) {
                showErrorMessage.password = true;
                errors[FormKey.password] = true;
                errors[FormKey.repeatPassword] = true;
                incorrectInputs++;
            }
        }
        if( !isUndefinedOrEmpty(form.email) ) {
            if(!validateEmail(form.email) ) {
                showErrorMessage.email = true;
                errors[FormKey.email] = true;
                incorrectInputs++;
            }
        }
        if( !isUndefinedOrEmpty(form.phone) ) {
            if ( !validatePhone(form.phone) ) {
                showErrorMessage.phone = true;
                errors[FormKey.phone] = true;
                incorrectInputs++;
            }
        }
        setShowErrorMessage(Object.assign({}, showErrorMessage));
        return errors;
    }

    const onSubmit = async () => {
        const formIsValid = validateForm();
        if(formIsValid) {
            const newUser: INewUser = {
                email: form.email,
                phone: form.phone,
                password: form.password
            }
            const response = await userService.Create<IUser, INewUser>(newUser);
            console.log(response);
        }
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
                        {translations.form.heading}
                    </Headline>
                    <FormInput 
                        errorMessage="Das war keine korrekte Email Addresse"
                        showErrorMessage={showErrorMessage.email}
                        iconName="email" error={formErrorStatus.email}
                        onChangeText={txt => setForm({...form, [FormKey.email]: txt})}
                        placeholder={translations.form.email}/>
                    <FormInput
                        errorMessage="Das ist keine Telefonnummer"
                        showErrorMessage={showErrorMessage.phone}
                        iconName="cellphone" error={formErrorStatus.phone}
                        onChangeText={txt => setForm({...form, [FormKey.phone]: txt})}
                        placeholder={translations.form.phone}/>
                    <FormInput 
                        errorMessage="Passwörter stimmen nicht überein"
                        showErrorMessage={showErrorMessage.password}
                        iconName="onepassword" error={formErrorStatus.password}
                        onChangeText={txt => setForm({...form, [FormKey.password]: txt})}
                        placeholder={translations.form.password} secureTextEntry/>
                    <FormInput
                        error={formErrorStatus.repeatPassword}
                        iconName="onepassword" secureTextEntry 
                        onChangeText={txt => setForm({...form, [FormKey.repeatPassword]: txt})}
                        placeholder={translations.form.repeat_password}/>
                    <Button 
                        onPress={onSubmit}
                        title={translations.form.submit_button} 
                        style={styles.submitButton}/>
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    );
}

export default SignUpForm
