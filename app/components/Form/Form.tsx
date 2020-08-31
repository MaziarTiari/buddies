import React, { useState, useContext, useMemo } from 'react';
import { Text, View } from 'react-native';
import FormTextInput from '../FormTextInput/FormTextInput';
import FormDateInput from '../FormDateInput/FormDatePicker';
import FormSelectorInput from '../FormSelectorInput/FormSelectorInput';
import Container from '../Container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getResponsiveSize } from '../../utils/font/font';
import { Headline } from 'react-native-paper';
import LinkLabel from '../LinkLabel/LinkLabel';
import Button from '../Button/Button';
import useFormStyle from './Form.style';
import { isUndefinedOrEmpty } from '../../utils/generics';
import { isEmail, isNumeric, isPhoneNumber } from '../../utils/validate';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';

export enum InputType {
    TEXT,
    SELECTOR,
    DATE,
    TIME
}

export interface IFormField {
    inputType: InputType;
    validationType?: 'email' | 'phone' | 'number';
    placeholder?: string;
    hideInput?: boolean;
    required?: boolean;
    icon?: string;
    initialValue?: any;
    items?: string[]; // only for selector
    errorMessage?: string;
    minimumDate?: Date;
}

export interface FormProps {
    heading?: string;
    buttonTitle: string;
    fieldList: IFormField[];
    onSubmit: (values: any[]) => void;
    linkLabel?: string;
    onLink?: () => void;
    errorMessage?: string;
}

function Form(props: FormProps) {
    const styles = useFormStyle();
    const { translations } = useContext(LanguageContext);

    const verifyInput = (index: number, value: any): boolean => {
        const { required, validationType: validateType } = props.fieldList[index];
        if (typeof value === 'string') {
            if (required && isUndefinedOrEmpty(value)) return false;
            if (!validateType) return true;
            switch (validateType) {
                case 'email':
                    return isEmail(value);
                case 'number':
                    return isNumeric(value);
                case 'phone':
                    return isPhoneNumber(value);
                default:
                    return false;
            }
        }
        return required ? value !== undefined : true;
    };

    const [formErrors, setFormErrors] = useState<boolean[]>(() =>
        props.fieldList.map((field, index) => !verifyInput(index, field.initialValue))
    );

    const [formData, setFormData] = useState<any[]>(() =>
        props.fieldList.map((field) => field.initialValue)
    );

    const [showErrors, setShowErrors] = useState<boolean>(false);

    const handleSubmit = (): void => {
        let formHasError = false;
        formErrors.forEach((e) => (formHasError = e || formHasError));
        if (formHasError) setShowErrors(true);
        else props.onSubmit(formData);
    };

    const handleChangeValue = (index: number, value: any): void => {
        const updatedFormData = [...formData];
        const updatedFormErrors = [...formErrors];
        updatedFormData[index] = value;
        updatedFormErrors[index] = !verifyInput(index, value);
        setFormData(updatedFormData);
        setFormErrors(updatedFormErrors);
    };

    const getTypeErrorMessage = (validationType: string) => {
        switch (validationType) {
            case 'email':
                return translations.error_invalid_email;
            case 'number':
                return translations.error_invalid_number;
            case 'phone':
                return translations.error_invalid_phone;
            default:
                return undefined;
        }
    };

    function renderFieldListElements() {
        let elements: JSX.Element[] = [];
        let scipNext = false;
        for (let i = 0; i < props.fieldList.length; i++) {
            if (scipNext) {
                continue;
            } else if (props.fieldList[i].inputType === InputType.TIME 
                    && props.fieldList[i + 1].inputType === InputType.TIME) {
                scipNext = true;
            }
            switch (props.fieldList[i].inputType) {
                case InputType.SELECTOR:
                    elements.push(
                        <FormSelectorInput
                            key={i}
                            onSelect={(text) =>
                                handleChangeValue(i, text)
                            }
                            selectedItem={props.fieldList[i].initialValue}
                            placeholder={props.fieldList[i].placeholder}
                            icon={props.fieldList[i].icon}
                            hasError={
                                showErrors && formErrors[i]
                            }
                            modalTitle={props.fieldList[i].placeholder || ''}
                            items={props.fieldList[i].items || []}
                        />
                    );
                    break;
                case InputType.DATE:
                    elements.push(
                        <FormDateInput
                            mode="date"
                            key={i}
                            onDateChange={(date) =>
                                handleChangeValue(i, date)
                            }
                            initialDate={props.fieldList[i].initialValue}
                            placeholder={props.fieldList[i].placeholder}
                            icon={props.fieldList[i].icon}
                            hasError={
                                showErrors && formErrors[i]
                            }
                            minimumDate={props.fieldList[i].minimumDate}
                        />
                    );
                    break;
                case InputType.TIME:
                    elements.push(
                        props.fieldList[i + 1]?.inputType === InputType.TIME
                            ? (
                                <View key={i} style={styles.timeRangeContainer}>
                                    <FormDateInput
                                        style={{ marginRight: getResponsiveSize(5) }}
                                        mode="time"
                                        onDateChange={(date) =>
                                            handleChangeValue(i, date)
                                        }
                                        initialDate={props.fieldList[i].initialValue}
                                        placeholder={props.fieldList[i].placeholder}
                                        icon={props.fieldList[i].icon}
                                        hasError={showErrors && formErrors[i]}
                                    />
                                    <FormDateInput
                                        mode="time"
                                        onDateChange={(date) =>
                                            handleChangeValue(i + 1, date)
                                        }
                                        initialDate={props.fieldList[i + 1].initialValue}
                                        placeholder={props.fieldList[i + 1].placeholder}
                                        icon={props.fieldList[i + 1].icon}
                                        hasError={showErrors && formErrors[i + 1]}
                                    />
                                </View>
                            )
                            : (
                                <FormDateInput
                                    mode="time"
                                    key={i}
                                    onDateChange={(date) =>
                                        handleChangeValue(i, date)
                                    }
                                    initialDate={props.fieldList[i].initialValue}
                                    placeholder={props.fieldList[i].placeholder}
                                    icon={props.fieldList[i].icon}
                                    hasError={
                                        showErrors && formErrors[i]
                                    }
                                />
                            )
                    );
                    break;
                case InputType.TEXT:
                    elements.push(
                        <FormTextInput
                            key={i}
                            onChangeText={(text) =>
                                handleChangeValue(i, text)
                            }
                            defaultValue={props.fieldList[i].initialValue}
                            placeholder={props.fieldList[i].placeholder}
                            icon={props.fieldList[i].icon}
                            hasError={
                                showErrors && formErrors[i]
                            }
                            errorMessage={
                                ( props.fieldList[i].errorMessage || (
                                    showErrors &&
                                    formErrors[i] &&
                                    props.fieldList[i].validationType &&
                                    getTypeErrorMessage(
                                        props.fieldList[i].validationType!
                                    )
                                )) || undefined
                            }
                            secureTextEntry={props.fieldList[i].hideInput}
                        />
                    );
                    break;
                default:
                    break;
            }
        }
        return elements;
    }

    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <KeyboardAwareScrollView
                    enableOnAndroid
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    extraHeight={getResponsiveSize(20)}
                    contentContainerStyle={styles.contentContainer}
                >
                    {props.heading && (
                        <Headline style={styles.heading}>
                            {props.heading}
                        </Headline>
                    )}
                    {props.errorMessage && (
                        <Text style={styles.errorMessage}>
                            {props.errorMessage}
                        </Text>
                    )}
                    {renderFieldListElements()}
                    <Button
                        onPress={handleSubmit}
                        title={props.buttonTitle}
                        style={styles.submitButton}
                        textStyle={styles.buttonText}
                    />
                    {props.linkLabel && (
                        <LinkLabel
                            label={props.linkLabel}
                            onPress={props.onLink}
                        />
                    )}
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    );
};

export default Form;
