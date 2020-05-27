import React, { useEffect, useContext, useState } from 'react';
import { Text } from 'react-native';
import Container from '../Container/Container';
import { useForm } from 'react-hook-form';
import { Headline } from 'react-native-paper';
import Button from '../Button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getResponsiveSize } from '../../utils/font/font';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { validateEmail, validatePhone } from '../../utils/functions/validate';
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

interface IFormErrorSatus {
    email: boolean;
    phone: boolean;
    password: boolean;
    repeatPassword: boolean;
}

const INITIAL_FORM_STATUS: IFormErrorSatus = {
    email: false,
    phone: false,
    password: false,
    repeatPassword: false,
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
    const [errorMessages, setErrorMessages] = useState<typeof INITIAL_ERROR_MESSAGES>(INITIAL_ERROR_MESSAGES)    
    const [form, setForm] = useState(INITIAL_FORM);

    const styles = useStyles();

    const setErrorMessage = (message: string, key: string) => {
        incorrectInputs++;
        setErrorMessages({...errorMessages, [key]: message})
    }

    const setErrorMessagesToDefault = () => {
        setFormErrorStatus(INITIAL_FORM_STATUS);
        setErrorMessages(INITIAL_ERROR_MESSAGES);
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
                console.log(key);
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
        if(incorrectInputs === Object.keys(form).length) return;
        if( !isUndefinedOrEmpty(form.password) && !isUndefinedOrEmpty(form.repeatPassword)) {
            if (form.password !== form.repeatPassword) {
                setErrorMessage("Passwörter stimmen nicht überein", FormKey.password);
                errors[FormKey.password] = true;
                errors[FormKey.repeatPassword] = true;
            }
        }
        if( !isUndefinedOrEmpty(form.email) ) {
            if(!validateEmail(form.email) ) {
                setErrorMessage("Das war keine korrekte Email Addresse", FormKey.email);
                errors[FormKey.email] = true;
            }
        }
        if( !isUndefinedOrEmpty(form.phone) ) {
            if ( !validatePhone(form.phone) ) {
                setErrorMessage("Das ist keine Telefonnummer", FormKey.phone);
                errors[FormKey.phone] = true;
            }
        }
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
                    { !isUndefinedOrEmpty(errorMessages.email) && 
                        <Text style={{color:"#FF2929"}}>{errorMessages.email}</Text>
                    }
                    <FormInput 
                        iconName="email" error={formErrorStatus.email}
                        onChangeText={txt => setForm({...form, [FormKey.email]: txt})}
                        placeholder={translations.form.email}/>
                    { !isUndefinedOrEmpty(errorMessages.phone) && 
                        <Text style={{color:"#FF2929"}}>{errorMessages.phone}</Text>
                    }
                    <FormInput
                        iconName="cellphone" error={formErrorStatus.phone}
                        onChangeText={txt => setForm({...form, [FormKey.phone]: txt})}
                        placeholder={translations.form.phone}/>
                    { !isUndefinedOrEmpty(errorMessages.password) && 
                        <Text style={{color:"#FF2929"}}>{errorMessages.password}</Text>
                    }
                    <FormInput 
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
