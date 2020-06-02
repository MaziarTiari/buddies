import React, { useState, useContext } from 'react'
import { View, Platform } from 'react-native'
import DatePicker, { DatePickerOptions } from '@react-native-community/datetimepicker';
import moment, { Moment } from 'moment';
import { IconButton, TouchableRipple } from 'react-native-paper';
import FormInput from '../FormInput/FormInput';
import { getResponsiveSize } from '../../utils/font/font';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

interface FormDatePickerProps {
    verify?: boolean;
    defaultInputValue?: string;
    onChange: (date: Moment) => void;
    options: DatePickerOptions;
    inputPlaceholder: string;
    onChangeText?: (value: string) => void;
    required?: boolean
}
const FormDatePicker = (Props: FormDatePickerProps) => {
    const [date, setDate] = useState(Props.options.value)
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState(Props.defaultInputValue || "");

    const { theme } = useContext(ThemeContext);

    const onDateChange = (event: any, dateIn: any) => {
        const d: Date = dateIn;
        setShow(Platform.OS === 'ios');
        const now = moment();
        d.setHours(now.hours());
        d.setMinutes(now.minutes());
        d.setSeconds(now.seconds());
        const dateFormatValue = moment(d).format('L');
        setInputValue(dateFormatValue);
        if(Props.onChangeText) Props.onChangeText(dateFormatValue)
        Props.onChange( moment.utc(d));
        setDate(d);
    }

    const IOS_OnCancel = () => {
        setShow(false);
    }

    const IOS_OnSelect = () => {
        setShow(false);
        setInputValue( moment(date).format('L') )
        Props.onChange(moment.utc(date));
        setDate(date);
    }

    const onRemove = () => {
        setInputValue("");
        if(Props.onChangeText)
            Props.onChangeText("");
    }

    function dropOnChange(props: FormDatePickerProps) {
        let { onChange, ...rest } = props.options;
        return rest;
    }

    const inputDeleteIcon = inputValue === "" 
                          ? undefined
                          : <IconButton 
                                icon="close" onPress={onRemove}
                                size={getResponsiveSize(24)} style={{margin:0}}
                                color={theme.App.primaryText}
                            />

    return (
        <View>
            <TouchableRipple onPress={() => setShow(!show)}>
                <FormInput 
                    onTouchStart={() => setShow(!show)} required={Props.required}
                    value={inputValue}
                    iconName="calendar" verify={Props.verify}
                    placeholder={Props.inputPlaceholder} editable={false}
                    rightComponent={inputDeleteIcon}
                />
            </TouchableRipple>
            {show &&
                <View style={Platform.OS === 'ios' && {backgroundColor:"#fff", borderRadius: 8}}>
                    <DatePicker
                        mode="date" 
                        {...dropOnChange(Props)}
                        onChange={onDateChange}
                        onTouchCancel={() => console.log("oncancel")}
                    />
                    { Platform.OS === 'ios' &&
                    <View 
                        style={{
                            flexDirection:"row", alignSelf:"flex-end", marginRight:20,
                        }}
                    >
                        <IconButton icon="close" onPress={IOS_OnCancel}/>
                        <IconButton icon="calendar-check" onPress={IOS_OnSelect}/>
                    </View>
                    }
                </View>
            }
        </View>
    )
}

export default FormDatePicker
