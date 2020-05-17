import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import Container from '../Container/Container'
import { useForm } from 'react-hook-form'
import InputField, { InputFieldProps } from '../InputField/InputField'
import { Headline, TouchableRipple, IconButton } from 'react-native-paper'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from '../Button/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getResponsiveSize } from '../../utils/font/font'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import DatePicker from '@react-native-community/datetimepicker';
import { validateEmail, validatePhone } from '../../utils/functions/validate'

enum form {
    username = "username",
    email = "email",
    phone = "phone",
    birthDate = "birthDate",
    city = "city",
    password = "password",
    repeatPassword = "repeatPassword",
}

interface FormWarning {
    username: boolean;
    email: boolean;
    phone: boolean;
    birthDate: boolean;
    city: boolean;
    password: boolean;
    repeatPassword: boolean;
}

const defaultFormWarning: FormWarning = {
    username: false,
    email: false,
    phone: false,
    birthDate: false,
    city: false,
    password: false,
    repeatPassword: false,
}

const LoginForm = () => {
    const {register, handleSubmit, setValue} = useForm();
    const translations = useContext(LanguageContext).translations;
    const styles = useStyles();
    const [formWarning, setFormWarning] = useState<FormWarning>(defaultFormWarning);
    const [showDate, setShowDate] = useState(false);
    const [birthDate, setBirthDate] = useState<Date>(new Date(1598051730000));
    const [birthDateValue, setBirthDateValue] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setpasswordErrorText] = useState("");

    useEffect(() => {
        register(form.username);
        register(form.email);
        register(form.phone);
        register(form.birthDate);
        register(form.city)
        register(form.password)
        register(form.repeatPassword)
    },[register]);

    const onDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || birthDate;
        setShowDate(Platform.OS === 'ios');
        setBirthDate(currentDate);
        if(Platform.OS !== 'ios')
            setBirthDateValue((currentDate as unknown as Date).toLocaleDateString());
    }

    const onCancelDate = () => {
        setShowDate(false);
    }

    const onDateSelected = () => {
        setShowDate(false);
        setBirthDateValue(birthDate.toLocaleDateString());
    }

    const onSubmit = (formData: any) => {
        const formIsValid = validateForm(formData);
        // if(succes) send to API and 
    }    

    const validateForm = (formData: any): boolean => {
        let inputErrors: number = 0;
        let warnings: any = formWarning;
        const result: boolean = inputErrors > 0;
        Object.keys(form).forEach(formIndex => {
            if(formData[formIndex] === undefined) {
                warnings[formIndex] = true;
                inputErrors++;
            } 
        });
        if( inputErrors === Object.keys(formData).length ) return result;
        warnings = validateInputPatterns(formData, warnings);
        setFormWarning(warnings);
        return result;
    }

    const isUndefinedOrEmpty = (string: string) => 
        !string || string === "" || string === " "

    const validateInputPatterns = (inputs: any, warnings: any) => {
        if( !isUndefinedOrEmpty(inputs[form.password]) ) {
            if (inputs[form.password] !== inputs[form.repeatPassword]) {
                setpasswordErrorText("Passwörter stimmen nicht überein");
                warnings[form.password] = true;
                warnings[form.repeatPassword] = true;
            }
        }
        if( !isUndefinedOrEmpty(inputs[form.email]) ) {
            if(validateEmail(inputs[form.email]) ) {
                setEmailErrorText("Das war keine korrekte Email Addresse");
                warnings[form.email] = true;
            }
        }
        if( !isUndefinedOrEmpty(inputs[form.phone]) ) {
            if ( !validatePhone(inputs[form.phone]) ) {
                // set phone warnings
            }
        }
            
    }

    const removeDateIcon = birthDateValue === "" 
                         ? undefined
                         : <IconButton 
                                icon="close" onPress={()=>setBirthDateValue("")}
                                size={getResponsiveSize(24)} style={{margin:0}}
                            />
    
    // TODO fix android
    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <KeyboardAwareScrollView 
                    resetScrollToCoords={{ x: 0, y: 0 }} enableOnAndroid
                    extraHeight={getResponsiveSize(20)} 
                    contentContainerStyle={styles.contentContainer}
                >
                    <Headline style={styles.heading}>
                        {translations.sign_up.heading}
                    </Headline>
                    <LoginInputField 
                        iconName="face-profile" warning={formWarning.username}
                        onChangeText={txt => setValue( form.username, txt)}
                        placeholder={translations.sign_up.username}/>
                    {/* <Text></Text> */}
                    <LoginInputField 
                        iconName="email" warning={formWarning.email}
                        onChangeText={txt => setValue( form.email, txt)}
                        placeholder={translations.sign_up.email}/>
                    <LoginInputField
                        iconName="cellphone" warning={formWarning.phone}
                        onChangeText={txt => setValue( form.phone, txt)}
                        placeholder={translations.sign_up.phone}/>
                    <View >
                    <TouchableRipple onPress={() => setShowDate(true)}>
                        <LoginInputField 
                            value={birthDateValue}
                            iconName="calendar" warning={formWarning.birthDate}
                            onChangeText={txt => setValue( form.birthDate, txt)}
                            placeholder={translations.sign_up.birth_date} editable={false}
                            rightComponent={removeDateIcon}
                        />
                    </TouchableRipple>
                    {showDate && (
                        <View style={Platform.OS === 'ios' && {backgroundColor:"#fff", borderRadius: 8}}>
                            <DatePicker
                                //testID="dateTimePicker"
                                value={birthDate}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                            { Platform.OS === 'ios' &&
                            <View 
                                style={{
                                    flexDirection:"row", alignSelf:"flex-end", marginRight:20,
                                }}
                            >
                                <IconButton icon="close" onPress={onCancelDate}/>
                                <IconButton icon="calendar-check" onPress={onDateSelected}/>
                            </View>
                            }
                        </View>
                     )}
                    </View>
                    <LoginInputField 
                        iconName="city" warning={formWarning.city}
                        onChangeText={txt => setValue( form.city, txt)}
                        placeholder={translations.sign_up.city}/>
                    <LoginInputField 
                        iconName="onepassword" warning={formWarning.password}
                        onChangeText={txt => setValue( form.password, txt)}
                        placeholder={translations.sign_up.password} secureTextEntry/>
                    <LoginInputField
                        warning={formWarning.repeatPassword}
                        iconName="onepassword" secureTextEntry 
                        onChangeText={txt => setValue( form.repeatPassword, txt)}
                        placeholder={translations.sign_up.repeat_password}/>
                    <Button 
                        onPress={handleSubmit(onSubmit)} 
                        title={translations.sign_up.submit_button} 
                        style={styles.submitButton}/>
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    );
}

const useStyles = () => {
    const theme = useContext(ThemeContext).theme;
    return StyleSheet.create({
        root: {
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            alignContent:"center"
        },
        contentContainer: {
            marginHorizontal: getResponsiveSize(30),
            paddingVertical: getResponsiveSize(30),
        },
        heading: {
            color: theme.App.primaryText,
            fontWeight:"700",
            marginBottom: getResponsiveSize(20),
        },
        submitButton: {
            marginVertical: getResponsiveSize(20),
            width: "90%",
            alignSelf: "center"
        }
    });
}

interface LoginInputFieldProps extends InputFieldProps{
    iconName: string;
    warning?: boolean;
}
const LoginInputField = ({iconName, warning, ...Props}: LoginInputFieldProps) => {
    const borderColorStyle = warning ? {borderColor: "#FF2929"} : {};
    return (<InputField 
                {...Props}
                containerStyle={[
                    {marginVertical:getResponsiveSize(10), borderWidth: 1,},
                    borderColorStyle,
                ]}
                leftComponent={
                    <MaterialCommunityIcons 
                        style={{marginHorizontal:getResponsiveSize(10),}} 
                        name={iconName} 
                        size={getResponsiveSize(24)}/>
                }
            />
    )
}

export default LoginForm
