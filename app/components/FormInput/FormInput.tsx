import React from 'react';
import InputField, { InputFieldProps } from "../InputField/InputField";
import { getResponsiveSize } from "../../utils/font/font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from 'react-native';

interface FormInputProps extends InputFieldProps{
    iconName: string;
    error?: boolean;
    errorMessage?: string;
    showErrorMessage?: boolean;
}

const FormInput = 
        ({iconName, error, showErrorMessage, errorMessage,...Props}: FormInputProps) => 
{
    const borderColorStyle = error ? {borderColor: "#FF2929"} : {};
    return (
            <View>
            {showErrorMessage && <Text style={{color:"#FF2929"}}>{errorMessage}</Text>}
            <InputField 
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
            </View>
    )
}

export default FormInput;