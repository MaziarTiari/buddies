import React, { useState, useContext } from 'react'
import { View, Platform } from 'react-native'
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { IconButton, TouchableRipple } from 'react-native-paper';
import FormTextInput, { FormTextInputProps } from '../FormTextInput/FormTextInput';
import { getResponsiveSize } from '../../utils/font/font';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { style } from './FormDatePicker.style';

export interface FormDateInputProps extends FormTextInputProps {
    onDateChange: (date: Date | undefined) => void;
    initialDate?: Date;
}

const FormDateInput = (Props: FormDateInputProps) => {
    const [date, setDate] = useState<Date | undefined>(Props.initialDate);
    const [show, setShow] = useState(false);

    const { theme } = useContext(ThemeContext);

    const handleChange = (event: any, dateIn: any) => {
        const date: Date = dateIn;
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        setShow(Platform.OS === 'ios');
        setDate(date);
        Props.onDateChange(date);
    }

    const IOS_OnCancel = () => {
        setShow(false);
    }

    const IOS_OnSelect = () => {
        setShow(false);
        setDate(date);
        Props.onDateChange(date);
    }

    const handleRemove = () => {
        setDate(undefined);
        Props.onDateChange(undefined);
    }

    let inputDeleteIcon: JSX.Element | undefined, inputText: string | undefined;

    if (date !== undefined) {
        inputDeleteIcon = <IconButton
            icon="close"
            onPress={handleRemove}
            size={getResponsiveSize(24)}
            style={{ margin: 0 }}
            color={theme.App.primaryText}
        />
        inputText = moment(date).format('L');
    }

    return (
        <View>
            <TouchableRipple onPress={() => setShow(!show)}>
                <FormTextInput
                    {...Props}
                    value={inputText}
                    editable={false}
                    rightComponent={inputDeleteIcon}
                />
            </TouchableRipple>
            {show &&
                <View style={style.container}>
                    <DatePicker
                        mode="date"
                        onChange={handleChange}
                        value={date ? date : new Date()}
                    />
                    {Platform.OS === 'ios' &&
                        <View style={style.buttonContainer}>
                            <IconButton icon="close" onPress={IOS_OnCancel} />
                            <IconButton icon="calendar-check" onPress={IOS_OnSelect} />
                        </View>
                    }
                </View>
            }
        </View>
    )
}

export default FormDateInput;
