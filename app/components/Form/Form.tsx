import React, { useState, useContext } from "react";
import { Text } from "react-native";
import FormTextInput from "../FormTextInput/FormTextInput";
import FormDateInput from "../FormDateInput/FormDatePicker";
import FormSelectorInput from "../FormSelectorInput/FormSelectorInput";
import Container from "../Container/Container";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getResponsiveSize } from "../../utils/font/font";
import { Headline } from "react-native-paper";
import LinkLabel from "../LinkLabel/LinkLabel";
import Button from "../Button/Button";
import useStyle from "./Form.style";
import { isUndefinedOrEmpty } from "../../utils/generics";
import { isEmail, isNumeric, isPhoneNumber } from "../../utils/validate";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export enum InputType { TEXT, SELECTOR, DATE }

export interface IFormField {
    inputType: InputType;
    validationType?: "email" | "phone" | "number";
    placeholder?: string;
    hideInput?: boolean;
    required?: boolean;
    icon?: string;
    initialValue?: any;
    items?: string[]; // only for selector
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

const Form = (Props: FormProps) => {
    const style = useStyle();

    const verifyInput = (index: number, value: any): boolean => {
        const { required, validationType: validateType } = Props.fieldList[index];
        if (typeof value === "string") {
            if (required && isUndefinedOrEmpty(value)) return false;
            if (!validateType) return true;
            switch (validateType) {
                case "email": return isEmail(value);
                case "number": return isNumeric(value);
                case "phone": return isPhoneNumber(value);
                default: return false;
            }
        }
        return required ? value !== undefined : true;
    }

    const { translations } = useContext(LanguageContext);
    const [formErrors, setFormErrors] = useState<boolean[]>(
        () => Props.fieldList.map((field, index) => !verifyInput(index, field.initialValue))
    );
    const [formData, setFormData] = useState<any[]>(() => Props.fieldList.map(field => field.initialValue));
    const [showErrors, setShowErrors] = useState<boolean>(false);

    const handleSubmit = (): void => {
        let formHasError = false;
        formErrors.forEach(e => formHasError = e || formHasError);
        if (formHasError) setShowErrors(true);
        else Props.onSubmit(formData);
    };

    const handleChangeValue = (index: number, value: any): void => {
        const updatedFormData = [...formData];
        const updatedFormErrors = [...formErrors];
        updatedFormData[index] = value;
        updatedFormErrors[index] = !verifyInput(index, value);
        setFormData(updatedFormData);
        setFormErrors(updatedFormErrors);
    };

    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <KeyboardAwareScrollView
                    enableOnAndroid
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    extraHeight={getResponsiveSize(20)}
                    contentContainerStyle={style.contentContainer}
                >
                    {Props.heading &&
                        <Headline style={style.heading}>{Props.heading}</Headline>}
                    {Props.errorMessage &&
                        <Text style={style.errorMessage}>{Props.errorMessage}</Text>}
                    {Props.fieldList.map((field, index) => {
                        switch (field.inputType) {
                            case InputType.SELECTOR:
                                return <FormSelectorInput
                                    key={index}
                                    onSelect={(text) => handleChangeValue(index, text)}
                                    selectedItem={field.initialValue}
                                    placeholder={field.placeholder}
                                    icon={field.icon}
                                    hasError={showErrors && formErrors[index]}
                                    modalTitle={field.placeholder || ""}
                                    items={field.items || []}
                                />
                            case InputType.DATE:
                                return <FormDateInput
                                    key={index}
                                    onDateChange={(date) => handleChangeValue(index, date)}
                                    initialDate={field.initialValue}
                                    placeholder={field.placeholder}
                                    icon={field.icon}
                                    hasError={showErrors && formErrors[index]}
                                />
                            case InputType.TEXT:
                                return <FormTextInput
                                    key={index}
                                    onChangeText={(text) => handleChangeValue(index, text)}
                                    defaultValue={field.initialValue}
                                    placeholder={field.placeholder}
                                    icon={field.icon}
                                    hasError={showErrors && formErrors[index]}
                                    errorMessage={(showErrors && formErrors[index] && field.validationType && translations.formInput.error[field.validationType]) || undefined}
                                    secureTextEntry={field.hideInput}
                                />
                        }
                    })}
                    <Button
                        onPress={handleSubmit}
                        title={Props.buttonTitle}
                        style={style.submitButton}
                    />
                    {Props.linkLabel &&
                        <LinkLabel label={Props.linkLabel} onPress={Props.onLink} />
                    }
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    );
};

export default Form;