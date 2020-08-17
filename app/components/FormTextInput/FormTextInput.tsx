import React, { useContext } from 'react';
import InputField, { InputFieldProps } from "../InputField/InputField";
import { getResponsiveSize } from "../../utils/font/font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import useStyle from './FormTextInput.style';

export interface FormTextInputProps extends InputFieldProps {
    icon?: string;
    errorMessage?: string;
    hasError?: boolean;
}

const FormTextInput = (Props: FormTextInputProps) => {

    const style = useStyle();
    const { theme } = useContext(ThemeContext);

    const borderColorStyle = Props.hasError ? { borderColor: theme.App.errorColor } : undefined;

    return (
        <View>
            {Props.errorMessage &&
                <Text style={{ color: theme.App.errorColor }}>{Props.errorMessage}</Text>}
            <InputField
                {...Props}
                containerStyle={[borderColorStyle, style.container, Props.containerStyle]}
                style={style.input}
                placeholderTextColor={theme.App.secondaryText}
                leftComponent={Props.icon ?
                    <MaterialCommunityIcons
                        style={{ marginRight: getResponsiveSize(8) }}
                        color={theme.App.primaryText}
                        name={Props.icon}
                        size={getResponsiveSize(24)} />
                    : undefined
                }
            />
        </View>
    )
}

export default FormTextInput;