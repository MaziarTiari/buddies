import React from 'react';
import InputField, { InputFieldProps } from "../InputField/InputField";
import { getResponsiveSize } from "../../utils/font/font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FormInputProps extends InputFieldProps{
    iconName: string;
    error?: boolean;
}

const FormInput = ({iconName, error, ...Props}: FormInputProps) => 
{
    const borderColorStyle = error ? {borderColor: "#FF2929"} : {};
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

export default FormInput;