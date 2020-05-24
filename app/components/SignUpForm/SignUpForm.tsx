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
import moment from 'moment';
import FormDatePicker from '../FormDatePicker/FormDatePicker';
import { UserBackend } from '../../api/UserApi'
import { INewUser } from '../../models/User';

enum form {
    username = "username",
    email = "email",
    phone = "phone",
    birthDate = "birthDate",
    city = "city",
    password = "password",
    repeatPassword = "repeatPassword",
}

interface FormErrorSate {
    username: boolean;
    email: boolean;
    phone: boolean;
    birthDate: boolean;
    city: boolean;
    password: boolean;
    repeatPassword: boolean;
}

const initialFormErrorState: FormErrorSate = {
    username: false,
    email: false,
    phone: false,
    birthDate: false,
    city: false,
    password: false,
    repeatPassword: false,
}

export interface IRequestedAccount {
    Username: string;
    Email: string;
    City: string;
    Password: string;
    Phone: string;
    BirthDate: number;
}

const SixteenYearsAgo = moment(Date.now()).subtract(16, 'years').toDate();

const SignUpForm = () => {
    const {register, handleSubmit, setValue} = useForm();
    const translations = useContext(LanguageContext).translations;
    const styles = useStyles();
    const [formErrorState, setFormErrorState] = useState<FormErrorSate>(initialFormErrorState);
    const [birthDate, setBirthDate] = useState<Date>(SixteenYearsAgo);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setpasswordErrorMessage] = useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

    useEffect(() => {
        Object.keys(form).forEach(formIndex => register(formIndex));
    },[register]);

    const setErrorMessagesToDefault = () => {
        setFormErrorState(initialFormErrorState);
        console.log(initialFormErrorState)
        setEmailErrorMessage("");
        setPhoneErrorMessage("");
        setpasswordErrorMessage("");
    }

    const validateForm = (formData: any): boolean => {
        setErrorMessagesToDefault();
        let incorrectInputs: number = 0;
        let errors: any = initialFormErrorState;
        const result: boolean = incorrectInputs > 0;
        Object.keys(form).forEach(formIndex => {
            if( isUndefinedOrEmpty(formData[formIndex]) ) {
                errors[formIndex] = true;
                incorrectInputs++;
            } else errors[formIndex] = false;
        });
        if( incorrectInputs === Object.keys(formData).length ) return result;
        errors = validateInputPatterns(formData, errors);
        setFormErrorState(errors);
        return result;
    }

    const isUndefinedOrEmpty = (string: string) => 
        !string || string === "" || string === " "

    const validateInputPatterns = (inputs: any, warnings: any): Object => {
        if( !isUndefinedOrEmpty(inputs[form.password]) ) {
            if (inputs[form.password] !== inputs[form.repeatPassword]) {
                setpasswordErrorMessage("Passwörter stimmen nicht überein");
                warnings[form.password] = true;
                warnings[form.repeatPassword] = true;
            }
        }
        if( !isUndefinedOrEmpty(inputs[form.email]) ) {
            if(!validateEmail(inputs[form.email]) ) {
                setEmailErrorMessage("Das war keine korrekte Email Addresse");
                warnings[form.email] = true;
            }
        }
        if( !isUndefinedOrEmpty(inputs[form.phone]) ) {
            if ( !validatePhone(inputs[form.phone]) ) {
                setPhoneErrorMessage("Das ist keine Telefonnummer");
                warnings[form.phone] = true;
            }
        }
        return warnings;
    }

    const onSubmit = (formData: any) => {
        const formIsValid = validateForm(formData);
        if(formIsValid) {
            const newUser: INewUser = {
                username: formData[form.username],
                email: formData[form.email],
                phone: formData[form.phone],
                birthDate: formData[form.birthDate],
                city: formData[form.city],
                password: formData[form.password]
            }
            UserBackend.createUser(newUser);
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
                        iconName="face-profile" error={formErrorState?.username}
                        onChangeText={txt => setValue( form.username, txt)}
                        placeholder={translations.form.username}/>
                    { !isUndefinedOrEmpty(emailErrorMessage) && 
                        <Text style={{color:"#FF2929"}}>{emailErrorMessage}</Text>
                    }
                    <FormInput 
                        iconName="email" error={formErrorState?.email}
                        onChangeText={txt => setValue( form.email, txt)}
                        placeholder={translations.form.email}/>
                    { !isUndefinedOrEmpty(phoneErrorMessage) && 
                        <Text style={{color:"#FF2929"}}>{phoneErrorMessage}</Text>
                    }
                    <FormInput
                        iconName="cellphone" error={formErrorState?.phone}
                        onChangeText={txt => setValue( form.phone, txt)}
                        placeholder={translations.form.phone}/>
                    <FormDatePicker 
                        onChange={d => setValue(form.birthDate, d)}
                        inputPlaceholder={translations.form.birth_date}
                        options={{value: birthDate, minimumDate: SixteenYearsAgo}}
                    />
                    <FormInput 
                        iconName="city" error={formErrorState?.city}
                        onChangeText={txt => setValue( form.city, txt)}
                        placeholder={translations.form.city}/>
                    { !isUndefinedOrEmpty(passwordErrorMessage) && 
                        <Text style={{color:"#FF2929"}}>{passwordErrorMessage}</Text>
                    }
                    <FormInput 
                        iconName="onepassword" error={formErrorState?.password}
                        onChangeText={txt => setValue( form.password, txt)}
                        placeholder={translations.form.password} secureTextEntry/>
                    <FormInput
                        error={formErrorState?.repeatPassword}
                        iconName="onepassword" secureTextEntry 
                        onChangeText={txt => setValue( form.repeatPassword, txt)}
                        placeholder={translations.form.repeat_password}/>
                    <Button 
                        onPress={handleSubmit(onSubmit)} 
                        title={translations.form.submit_button} 
                        style={styles.submitButton}/>
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    );
}

export default SignUpForm
