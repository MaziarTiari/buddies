import React, { useContext } from 'react';
import InputField, { InputFieldProps } from '../InputField/InputField';
import { getResponsiveSize } from '../../utils/font/font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import useFormTextInputStyle from './FormTextInput.style';

export interface FormTextInputProps extends InputFieldProps {
    icon?: string;
    errorMessage?: string;
    hasError?: boolean;
}

const FormTextInput = (props: FormTextInputProps) => {
    const styles = useFormTextInputStyle();
    const { theme } = useContext(ThemeContext);

    const borderColorStyle = {
        borderColor: props.hasError
            ? theme.App.errorColor
            : theme.App.inputBorderColor
    };

    return (
        <View>
            {props.errorMessage && (
                <Text style={{ color: theme.App.errorColor }}>
                    {props.errorMessage}
                </Text>
            )}
            <InputField
                onPress={props.onPress}
                {...props}
                containerStyle={[
                    borderColorStyle,
                    styles.container,
                    props.containerStyle
                ]}
                style={[styles.input, props.style]}
                placeholderTextColor={theme.App.secondaryText}
                leftComponent={
                    props.icon ? (
                        <MaterialCommunityIcons
                            style={{ marginRight: getResponsiveSize(8) }}
                            color={theme.App.primaryText}
                            name={props.icon}
                            size={getResponsiveSize(24)}
                        />
                    ) : undefined
                }
            />
        </View>
    );
};

export default FormTextInput;
