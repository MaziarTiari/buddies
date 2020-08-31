import React, { useContext, useState } from 'react';
import Form, { IFormField, InputType } from '../Form/Form';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import moment from 'moment';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../navigation/Navigation.config';

function ActivityEditForm() {
    const navigation = useNavigation();
    const { activity, setActivity } = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);
    const [errorMessage, setErrorMessage] = useState<string|undefined>()

    navigation.setOptions({title: activity.title});

    enum Field {
        LOCATION,
        START_DATE,
        END_DATE,
        START_TIME,
        END_TIME
    }

    const fieldList: IFormField[] = [];

    fieldList[Field.LOCATION] = {
        inputType: InputType.TEXT,
        initialValue: activity.location,
        required: false,
        placeholder: translations.meeting_point
    };

    fieldList[Field.START_DATE] = {
        inputType: InputType.DATE,
        initialValue: activity.startDate
            ? moment.unix(activity.startDate).toDate()
            : undefined,
        required: false,
        placeholder: translations.start_date,
        minimumDate: new Date()
    };

    fieldList[Field.END_DATE] = {
        inputType: InputType.DATE,
        initialValue: activity.endDate
            ? moment.unix(activity.endDate).toDate()
            : undefined,
        required: false,
        placeholder: translations.end_date,
        minimumDate: new Date(),
    };

    let startTime: Date = new Date();
    if (activity.startTime) {
        startTime.setHours(activity.startTime.hour, activity.startTime.minute);
    }
    fieldList[Field.START_TIME] = {
        inputType: InputType.TIME,
        initialValue: activity.startTime
            ? startTime
            : undefined,
        required: false,
        placeholder: translations.from,
    };

    let endTime = new Date();
    if (activity.endTime) {
        endTime.setHours(activity.endTime.hour, activity.endTime.minute);
    }
    fieldList[Field.END_TIME] = {
        inputType: InputType.TIME,
        initialValue: activity.endTime
            ? endTime
            : undefined,
        required: false,
        placeholder: translations.until
    };

    const handleSubmit = (data: any[]) => {
        const date1 = data[Field.START_DATE], date2 = data[Field.END_DATE];
        if (date1 && date2 && !moment(moment(date2)).isAfter(moment(date1))) {
            return setErrorMessage(translations.wrong_date_range);
        }
        setErrorMessage(undefined);
        setActivity({
            ...activity,
            location: data[Field.LOCATION],
            startDate: data[Field.START_DATE]
                ? moment(data[Field.START_DATE] as Date).unix()
                : undefined,
            endDate: data[Field.END_DATE]
                ? moment(data[Field.END_DATE] as Date).unix()
                : undefined,
            startTime: data[Field.START_TIME]
                ? data[Field.START_TIME]
                : undefined,
            endTime: data[Field.END_TIME]
                ? data[Field.END_TIME]
                : undefined
        });
        navigation.navigate(RouteName.Activity.Info);
    };

    return (
        <Form
            errorMessage={errorMessage}
            buttonTitle={translations.apply_changes}
            onSubmit={handleSubmit}
            fieldList={fieldList}
        />
    );
};

export default ActivityEditForm;
