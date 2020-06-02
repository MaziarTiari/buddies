import React, { useContext, useState, useEffect } from 'react';
import InputField, { InputFieldProps } from "../InputField/InputField";
import { getResponsiveSize } from "../../utils/font/font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Platform, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { isEmail, isNumeric, isPhoneNumber } from '../../utils/validate';

export interface FormInputProps extends InputFieldProps{
    iconName?: string;
    verify?: boolean;
    errorMessage?: string;
    showErrorMessage?: boolean;
    type?: "password" | "email" | "number" | "phone";
    errorStatusChange?: (status: boolean) => void;
    required?: boolean;
}

const FormInput = 
        ({iconName, verify, showErrorMessage, errorMessage,...Props}: FormInputProps) => 
{
    const initialError = Props.required ? true : false;

    const theme = useContext(ThemeContext).theme;
    const { translations } = useContext(LanguageContext);
    const [typeErrorStatus, setTypeErrorStatus] = useState(false);
    const [requiredErrorStatus, setRequiredErrorStatus] = useState(initialError);
    const [value, setValue] = useState(Props.defaultValue || "");
    const [showTypeErrorMessage, setShowTypeErrorMessage] = useState(false);

    const typeErrorMessage = Props.type
                           ? translations.formInput.error[Props.type] : undefined;

    const styles = StyleSheet.create({
        container: {
            paddingVertical: 
                Platform.OS === 'ios' ? getResponsiveSize(15) : getResponsiveSize(3),
            borderWidth: 1,
            marginVertical: getResponsiveSize(5),
            paddingHorizontal: getResponsiveSize(10)
        },
        input: {
            color: theme.App.primaryText,
        }
    });

    useEffect(() => setShowTypeErrorMessage(verify || false), [verify])

    const changeTypeErrorStatus = (status: boolean): boolean => {
        setTypeErrorStatus(status);
        return status;
    }

    const verifyPattern = (value: string): boolean => {
        if(Props.required) {
            const error = value === "";
            setRequiredErrorStatus(error);
            if(error) return error;
        };
        if(!Props.type) return false;
        switch(Props.type) {
            case "email":
                return changeTypeErrorStatus(!isEmail(value));
            case "number":
                return changeTypeErrorStatus(!isNumeric(value));
            case "phone":
                return changeTypeErrorStatus(!isPhoneNumber(value));
            default: break;
        }
        return false;
    }

    useEffect(() =>  {
        if(Props.errorStatusChange) {
            Props.errorStatusChange(verifyPattern(value));
        }
    }, [])

    const onChangeText = (value: string) => {
        setValue(value);
        const inputValidation = verifyPattern(value)
        if(Props.errorStatusChange)
            Props.errorStatusChange(inputValidation);
        setShowTypeErrorMessage(false);
        if(Props.onChangeText) Props.onChangeText(value);
    }

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setShowTypeErrorMessage(true);
        if(Props.onBlur) Props.onBlur(e);
    }

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setShowTypeErrorMessage(false);
        if(Props.onFocus) Props.onFocus(e);
    }

    const borderColorStyle = 
        verify && (showErrorMessage || requiredErrorStatus || (typeErrorStatus && showTypeErrorMessage))
        ? {borderColor: theme.App.errorColor} : undefined;
    return (
            <View>
            { showErrorMessage && 
            <Text style={{color:theme.App.errorColor}}>{errorMessage}</Text>}
            { (verify && typeErrorMessage !== undefined && typeErrorStatus && value !== "" && showTypeErrorMessage) &&
            <Text style={{color:theme.App.errorColor}}>{typeErrorMessage}</Text>}
            <InputField
                secureTextEntry={Props.type && Props.type === "password"}
                {...Props} onBlur={onBlur} onFocus={onFocus} onChangeText={onChangeText} 
                containerStyle={[borderColorStyle, styles.container]}
                placeholderTextColor={theme.App.secondaryText} style={styles.input}
                leftComponent={ iconName ?
                    <MaterialCommunityIcons
                        style={{marginRight: getResponsiveSize(8)}}
                        color={theme.App.primaryText}
                        name={iconName} 
                        size={getResponsiveSize(24)}/>
                    : undefined
                }
            />
            </View>
    )
}

export default FormInput;