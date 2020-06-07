import React, { useContext, useState } from "react";
import { StyleProp, TextStyle, View, Text, ScrollView, Modal } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { TouchableRipple, IconButton } from "react-native-paper";
import FormInput from "../FormInput/FormInput";
import { getResponsiveSize } from "../../utils/font/font";
import { useStyle } from "./Selector.style";
import CustomModal from '../CustomModal/CustomModal';

interface SelectorProps {
    error?: boolean;
    placeholder?: string;
    modalTitle: string;
    items: string[];
    onSelect: (item: string) => void;
	selectedItem?: string;
    style?: StyleProp<TextStyle>
    editable?: boolean;
}
export function Selector( Props: SelectorProps) {
    const { theme } = useContext(ThemeContext);
    const styles = useStyle(Props.editable || false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(Props.selectedItem || "");
    const [value, setValue] = useState(Props.selectedItem || "");
    const [items, setItems] = useState<string[]>(Props.items);

    const onSelect = (item: string) => {
        const selectedValue = item.length > getResponsiveSize(25) 
                            ? item.slice(0, getResponsiveSize(25)) 
                                + "..." : item;
        setShowModal(false);
        setSelectedItem(selectedValue);
        Props.onSelect(item);
        if(Props.editable)
            filterItems(item);
        setValue("");
        setItems(Props.items);
    }

    const filterItems = (text: string) => {
        const items = Props.items.filter(
            item => item.toLowerCase().startsWith(text.toLowerCase())
        );
        setItems(items);
    }

    const onChangeText = (text: string) => {
        setValue(text);
        filterItems(text);
        const selectableItem = Props.items.find(
            item => item.toLowerCase() === text.toLowerCase()
        )
        setSelectedItem(selectableItem || "")
    }

    const deleteInputValue = () => {
        setValue(""),
        setItems(Props.items);
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
            <TouchableRipple 
                onPress={() => onSelect(item)} 
                style={[
                    styles.item, 
                    { 
                        marginTop: index === 0 ? 15 : 0,
                        marginBottom: index === lastItem ? 15 : 0,
                    }
                ]}
                key={index} 
            >
                <Text onPress={() => onSelect(item)} style={styles.itemText}>
                    {item}
                </Text>
            </TouchableRipple>
        )
    }

    return (
        <View style={Props.style}>
            <TouchableRipple 
                style={styles.selectorContainer}
                onPress={() => setShowModal(!showModal)}>
                <FormInput
                    verify={Props.error}
                    placeholder={Props.placeholder}
                    value={selectedItem}
                    defaultValue={Props.selectedItem} 
                    editable={false}
                    onTouchStart={() => setShowModal(!showModal)}
                    rightComponent={
                        selectedItem !== "" ?
                        <IconButton
                            style={{margin:0}}
                            size={getResponsiveSize(18)}
                            icon="close" 
                            onPress={() => setToDefault()} 
                            color={theme.App.primaryText}/>
                        : undefined
                    }
                />
            </TouchableRipple>
            <CustomModal 
                onCloseModal={onCloseModal} 
                showModal={showModal} 
                fixPosition={Props.editable || false}
            >
                {Props.editable &&
                    <FormInput
                        containerStyle={styles.autosuggestInputField}
                        onChangeText={onChangeText}
                        placeholder={Props.placeholder}
                        value={value}
                        rightComponent={
                            value !== "" ?
                            <IconButton
                                style={{margin:0}}
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
                    {items.map((item, index) => renderItem(item, index))}
                </ScrollView>
            </CustomModal>
        </View>
    );
}