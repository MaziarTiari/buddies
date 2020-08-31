import React, { useState, useContext } from 'react';
import { View, Platform, StyleProp, ViewStyle } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { IconButton, TouchableRipple } from 'react-native-paper';
import FormTextInput, {
    FormTextInputProps
} from '../FormTextInput/FormTextInput';
import { getResponsiveSize } from '../../utils/font/font';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { style } from './FormDatePicker.style';
import { useDate } from '../../hooks/useDate';

export interface ITime {
    hour: number;
    minute: number;
}
export interface FormDateInputProps extends FormTextInputProps {
    mode: "date" | "time";
    onDateChange: (date?: Date | ITime) => void;
    initialDate?: Date;
    minimumDate?: Date;
    style?: StyleProp<ViewStyle>;
}

function FormDateInput(props: FormDateInputProps) {
    const { theme } = useContext(ThemeContext);
    const { getLocalDateString, getTimeString, getTime } = useDate();
    const [date, setDate] = useState<Date | undefined>(props.initialDate);

    const [time, setTime] = useState<ITime | undefined>(
        props.initialDate && props.mode === "time"
            ? getTime(props.initialDate)
            : undefined
    );

    const [show, setShow] = useState(false);


    const handleChange = (event: any, dateIn: any) => {
        setShow(Platform.OS === 'ios');
        if (!dateIn) {
            return;
        }
        let date: Date = dateIn as Date;
        let time: ITime = {
            hour: date.getHours(),
            minute: date.getMinutes()
        };
        switch (props.mode) {
            case "date":
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                setDate(date);
                break;
            case "time":
                setTime(time);
                break;
            default:
                return;
        }
        props.onDateChange(props.mode === "date" ? date : time);
    };

    const IOS_OnCancel = () => {
        setShow(false);
    };

    const IOS_OnSelect = () => {
        setShow(false);
        setDate(date);
        props.onDateChange(date);
    };

    const handleRemove = () => {
        setDate(undefined);
        setTime(undefined);
        props.onDateChange(undefined);
    };

    let inputDeleteIcon: JSX.Element | undefined, inputText: string | undefined;

    if ((props.mode === "date" && date) || (props.mode === "time" && time)) {
        inputDeleteIcon = (
            <IconButton
                icon="close"
                onPress={handleRemove}
                size={getResponsiveSize(24)}
                style={{ margin: 0 }}
                color={theme.App.primaryText}
            />
        );
        inputText = props.mode === "date"
            ? date ? getLocalDateString(date, false) : undefined
            : time ? getTimeString(time) : undefined;
    }

    return (
        <View style={[{ flex: 1 }, props.style]}>
            <TouchableRipple onPress={() => setShow(!show)}>
                <FormTextInput
                    {...props}
                    value={inputText}
                    editable={false}
                    rightComponent={inputDeleteIcon}
                />
            </TouchableRipple>
            {show && (
                <View style={style.container}>
                    <DatePicker
                        mode={props.mode}
                        minimumDate={props.minimumDate}
                        is24Hour={true}
                        onChange={handleChange}
                        value={date ? date : new Date()}
                    />
                    {Platform.OS === 'ios' && (
                        <View style={style.buttonContainer}>
                            <IconButton icon="close" onPress={IOS_OnCancel} />
                            <IconButton
                                icon="calendar-check"
                                onPress={IOS_OnSelect}
                            />
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default FormDateInput;
