import React from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings,
} from "react-native-custom-picker";
import useCustomizedPickerStyle from "./CustomizedPicker.style";

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
    const styles = useCustomizedPickerStyle();

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.headerText}</Text>
        </View>
    );

    const renderOption = ({ getLabel, item }: OptionTemplateSettings) => (
        <View style={styles.option}>
            <Text style={[styles.label, props.labelTextStyle]}>{getLabel(item)}</Text>
        </View>
    );

    const renderField = ({
        getLabel,
        selectedItem,
        defaultText,
    }: FieldTemplateSettings) => (
        <View style={[styles.field]}>
            <Text style={[styles.label, props.labelTextStyle]}>
                {(selectedItem && getLabel(selectedItem)) || defaultText}
            </Text>
            <Text style={styles.label}>▼</Text>
        </View>
    );

    return (
        <View style={props.style}>
            <CustomPicker
                options={props.itemList || []}
                value={props.selectedItem}
                modalStyle={styles.modal}
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
