import React from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings,
} from "react-native-custom-picker";
import useStyle from "./CustomizedPicker.style";

export interface CustomizedPickerProps {
    selectedItem?: any;
    itemList: any[];
    headerText?: string;
    getLabel: (selectedItem: any) => string;
    onItemChange: (selectedItem: any) => void;
    style?: StyleProp<ViewStyle>;
    placeholder?: string;
    labelTextStyle?: StyleProp<TextStyle>;
    // titleTextStyle?: StyleProp<Text>;
}

const CustomizedPicker = (props: CustomizedPickerProps) => {
    const style = useStyle();

    const renderHeader = () => (
        <View style={style.header}>
            <Text style={style.headerText}>{props.headerText}</Text>
        </View>
    );

    const renderOption = ({ getLabel, item }: OptionTemplateSettings) => (
        <View style={style.option}>
            <Text style={[style.label, props.labelTextStyle]}>{getLabel(item)}</Text>
        </View>
    );

    const renderField = ({
        getLabel,
        selectedItem,
        defaultText,
    }: FieldTemplateSettings) => (
        <View style={[style.field]}>
            <Text style={[style.label, props.labelTextStyle]}>
                {(selectedItem && getLabel(selectedItem)) || defaultText}
            </Text>
            <Text style={style.label}>▼</Text>
        </View>
    );

    return (
        <View style={props.style}>
            <CustomPicker
                options={props.itemList || []}
                value={props.selectedItem}
                modalStyle={style.modal}
                fieldTemplate={renderField}
                headerTemplate={(props.headerText && renderHeader) || undefined}
                optionTemplate={renderOption}
                getLabel={props.getLabel}
                onValueChange={props.onItemChange}
                placeholder={props.placeholder}
            />
        </View>
    );
};
export default CustomizedPicker;
