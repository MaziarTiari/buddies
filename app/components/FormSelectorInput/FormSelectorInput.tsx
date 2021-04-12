import React, { useContext, useState } from "react";
import { StyleProp, TextStyle, View, Text, ScrollView, ViewStyle, TouchableHighlight } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { TouchableRipple, IconButton } from "react-native-paper";
import FormTextInput, { FormTextInputProps } from "../FormTextInput/FormTextInput";
import { getResponsiveSize, getResponsiveHeight } from "../../utils/font/font";
import { useFormSelectorInputStyle } from "./FormSelectorInput.style";
import CustomModal from '../CustomModal/CustomModal';
import { Utilities } from "../../utils/AppUtilities";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "color";

export interface FormSelectorInputProps extends FormTextInputProps {
    modalTitle: string;
    items: string[];
    onSelect: (item: string) => void;
    selectedItem?: string;
    inputStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    editable?: boolean;
}

const FormSelectorInput = (props: FormSelectorInputProps) => {
    const { theme } = useContext(ThemeContext);
    const styles = useFormSelectorInputStyle(props.editable || false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(props.selectedItem || "");
    const [value, setValue] = useState(props.selectedItem || "");
    const [items, setItems] = useState<string[]>(props.items);

    const handleItemPressed = (item: string) => {
        const selectedValue = item.length > getResponsiveSize(25)
            ? item.slice(0, getResponsiveSize(25)) + "..." 
            : item;
        setShowModal(false);
        setSelectedItem(selectedValue);
        props.onSelect(item);
        if (props.editable) {
            filterItems(item);
        }
        setValue("");
        setItems(props.items);
    }

    const filterItems = (text: string) => {
        const items = props.items.filter(
            item => item.toLowerCase().startsWith(text.toLowerCase())
        );
        setItems(items);
    }

    const onChangeText = (text: string) => {
        setValue(text);
        filterItems(text);
        const selectableItem = props.items.find(
            item => item.toLowerCase() === text.toLowerCase()
        )
        setSelectedItem(selectableItem || "");
    }

    const deleteInputValue = () => {
        setValue("");
        setItems(props.items);
        props.onSelect("");
    }

    const setToDefault = () => {
        deleteInputValue();
        setSelectedItem("");
    }

    const onCloseModal = () => {
        setShowModal(false);
        deleteInputValue();
    }

    const renderItem = (item: string, index: number) => {
        const lastItem = items.length - 1;
        return (
            <TouchableHighlight
                onPress={() => handleItemPressed(item)}
                style={[
                    styles.item,
                    {
                        paddingTop: index === 0 ? 15 : 0,
                        paddingBottom: index === lastItem ? 15 : 0,
                    }
                ]}
                key={index}
            >
                <Text onPress={() => handleItemPressed(item)} style={styles.itemText}>
                    {item}
                </Text>
            </TouchableHighlight>
        )
    }

    return (
        <View style={props.style}>
            <TouchableHighlight
                underlayColor={Color(theme.App.inputBackground).darken(0.3).hex()}
                style={[styles.selectorContainer, props.containerStyle]}
                onPress={() => setShowModal(!showModal)}>
                <FormTextInput
                    {...props}
                    style={props.inputStyle}
                    value={selectedItem}
                    containerStyle={{marginVertical: 0, backgroundColor: "transparent"}}
                    defaultValue={props.selectedItem}
                    editable={false}
                    rightComponent={
                        selectedItem !== "" ?
                            <IconButton
                                style={{ margin: 0 }}
                                size={getResponsiveSize(18)}
                                icon="close"
                                onPress={() => setToDefault()}
                                color={theme.App.primaryText} />
                            : undefined
                    }
                />
            </TouchableHighlight>
            <CustomModal
                onCloseModal={onCloseModal}
                showModal={showModal}
                fixPosition={props.editable || false}
            >
                {props.editable &&
                    <FormTextInput
                        containerStyle={[styles.autosuggestInputField, props.containerStyle]}
                        onChangeText={onChangeText}
                        placeholder={props.placeholder}
                        value={value}
                        style={props.inputStyle}
                        rightComponent={
                            value !== "" ?
                                <IconButton
                                    style={{ margin: 0 }}
                                    size={getResponsiveSize(18)}
                                    icon="close"
                                    onPress={() => setToDefault()}
                                    color={theme.App.primaryText}
                                />
                                : undefined
                        }
                    />
                }
                <ScrollView style={styles.dropDownListContainer}>
                    {items.map((item, index) => (
                        <TouchableRipple
                            onPress={() => handleItemPressed(item)}
                            style={[
                                styles.item,
                                {
                                    paddingVertical: getResponsiveHeight(5),
                                    marginBottom: index === items.length - 1 
                                        ? getResponsiveHeight(10) : 0,
                                    marginTop: index === 0 
                                        ? getResponsiveHeight(10) : 0,
                                }
                            ]}
                            key={index}
                        >
                            <Text 
                                style={styles.itemText}>
                                {item}
                            </Text>
                        </TouchableRipple>
                    ))}
                </ScrollView>
            </CustomModal>
        </View>
    );
}

export default FormSelectorInput;
