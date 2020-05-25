import React, { useState } from 'react'
import { View, Platform } from 'react-native'
import DatePicker, { DatePickerOptions } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { IconButton, TouchableRipple } from 'react-native-paper';
import FormInput from '../FormInput/FormInput';
import { getResponsiveSize } from '../../utils/font/font';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FormDatePickerProps {
    error?: boolean;
    onChange: (date: Date) => void;
    options: DatePickerOptions;
    inputPlaceholder: string;
}
const FormDatePicker = (Props: FormDatePickerProps) => {
    const [date, setDate] = useState(Props.options.value)
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState("");


    const onDateChange = (event: any, dateIn: any) => {
        const d = dateIn || Props.options.value;
        if(Platform.OS === 'ios')
            setShow(false);
        else
            setInputValue( moment(d).format('L') )
        Props.onChange(d);
        setDate(d);
    }

    const IOS_OnCancel = () => {
        setShow(false);
    }

    const IOS_OnSelect = () => {
        setShow(false);
        setInputValue( moment(date).format('L') )
        Props.onChange(date);
        setDate(date);
    }

    function dropOnChange(props: FormDatePickerProps) {
        let { onChange, ...rest } = props.options;
        return rest;
    }

    const inputDeleteIcon = inputValue === "" 
                          ? undefined
                          : <IconButton 
                                icon="close" onPress={()=>setInputValue("")}
                                size={getResponsiveSize(24)} style={{margin:0}}
                            />

    return (
        <View>
            <TouchableRipple onPress={() => setShow(true)}>
                <FormInput 
                    onTouchStart={() => setShow(true)}
                    value={inputValue}
                    iconName="calendar" error={Props.error}
                    placeholder={Props.inputPlaceholder} editable={false}
                    rightComponent={inputDeleteIcon}
                />
            </TouchableRipple>
            {show && 
                <View style={Platform.OS === 'ios' && {backgroundColor:"#fff", borderRadius: 8}}>
                    <DatePicker
                        {...dropOnChange(Props)}
                        onChange={onDateChange}
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
