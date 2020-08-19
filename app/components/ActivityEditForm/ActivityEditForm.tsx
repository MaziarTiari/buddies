import React, { useContext } from "react";
import Form, { IFormField, InputType } from "../Form/Form";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import moment from "moment";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import { RouteName } from "../../navigation/Navigation.config";

const ActivityEditForm = () => {

    const navigation = useNavigation();
    const { activity, setActivity } = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);

    enum Field { TITLE, LOCATION, START_DATE, END_DATE };

    const fieldList: IFormField[] = [];

    fieldList[Field.TITLE] = {
        inputType: InputType.TEXT,
        initialValue: activity.title,
        required: true,
        placeholder: "Placeholder TItle"
    };

    fieldList[Field.LOCATION] = {
        inputType: InputType.TEXT,
        initialValue: activity.location,
        required: true,
        placeholder: "Placeholder Location"
    };

    fieldList[Field.START_DATE] = {
        inputType: InputType.DATE,
        initialValue: activity.startDate ? moment.unix(activity.startDate).toDate() : undefined,
        required: false,
        placeholder: "Placeholder (optional)"
    };

    fieldList[Field.END_DATE] = {
        inputType: InputType.DATE,
        initialValue: activity.endDate ? moment.unix(activity.endDate).toDate() : undefined,
        required: false,
        placeholder: "Placeholder (optional)"
    };

    const handleSubmit = (data: any[]) => {
        setActivity({
            ...activity,
            title: data[Field.TITLE],
            location: data[Field.LOCATION],
            startDate: data[Field.START_DATE] ? moment(data[Field.START_DATE] as Date).unix() : undefined,
            endDate: data[Field.END_DATE] ? moment(data[Field.END_DATE] as Date).unix() : undefined,
        });
        navigation.navigate(RouteName.Activity.Info);
    };

    return (
        <Form
            buttonTitle="CHANGE"
            onSubmit={handleSubmit}
            fieldList={fieldList}
        />
    )


};

export default ActivityEditForm;