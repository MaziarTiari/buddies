import React, {useContext, useState } from 'react';
import Container from '../Container/Container';
import { Headline } from 'react-native-paper';
import Button from '../Button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getResponsiveSize } from '../../utils/font/font';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { validateEmail, validatePhone } from '../../utils/generics/validate';
import FormInput from '../FormInput/FormInput';
import useStyles from './SignUpForm.style';
import { ApiClient } from '../../api/ApiClient'
import { INewUser, IUser } from '../../models/User';
import { getServiceUrl } from '../../api/channels';
import { 
    IFormErrorSatus, INITIAL_FORM_STATUS, INITIAL_SHOW_ERROR_MSG, IShowErrowMessage, 
    IForm, INITIAL_FORM, FormKey 
} from './constants';

const userService = new ApiClient<IUser>({ baseURL: getServiceUrl("Users") });
var incorrectInputs: number = 0;

const SignUpForm = () => {

    const [formErrorStatus, setFormErrorStatus] = 
        useState<IFormErrorSatus>(INITIAL_FORM_STATUS);
    const [showErrorMessage, setShowErrorMessage] = 
        useState<IShowErrowMessage>(INITIAL_SHOW_ERROR_MSG);
    const [form, setForm] = useState<IForm>(INITIAL_FORM);

    const translations = useContext(LanguageContext).translations;
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
        errors = validateInputPatterns(errors);
        setFormErrorStatus(Object.assign({} ,errors))
        return result();
    }

    const isUndefinedOrEmpty = (string: string) => 
        !string || string === "" || string === " "

    
    const validateInputPatterns = (errors: any): IFormErrorSatus => {
        let showErrorMessage: IShowErrowMessage = {
            email: false, password: false, phone: false
        };
        if(incorrectInputs === Object.keys(form).length) return errors;
        if(!isUndefinedOrEmpty(form.password) && !isUndefinedOrEmpty(form.repeatPassword)) 
        {
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
                        onChangeText={txt => 
                            setForm({...form, [FormKey.repeatPassword]: txt})}
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
