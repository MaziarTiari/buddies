import React, { useState, useRef, useEffect, useContext } from "react";
import { Modal, View, Text, Button } from "react-native";
import CustomizedPicker from "../CustomizedPicker/CustomizedPicker";
import { ICategory } from "../TagItem/TagItem";
import { TouchableRipple } from "react-native-paper";
import useStyle from "./TagEditor.style";
import Autocomplete from "react-native-autocomplete-input";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

export interface TagEditorProps {
    visible: boolean;
    onSave: (selectedCategory: ICategory, selectedText: string) => void;
    onCancel: () => void;
    categoryList: ICategory[];
    headline: string;
    preselectedText?: string;
    preselectedCategory?: ICategory;
    textPlaceholder?: string;
    categoryPlaceholder?: string;
}

const MIN_SUGGESTION_LENGHT = 3;
const allSuggestions = [
    "Musterfirma GmbH",
    "Musterfabrik AG",
    "Mustermann und Söhne",
    "Musterfirma Süd",
    "Hochschule Worms",
    "Hochschule Heidelberg",
    "Hochschule Frankfurt a.M.",
    "Grundschule Worms",
]; // received from API later

const TagEditor = (props: TagEditorProps) => {
    const style = useStyle();
    const { theme } = useContext(ThemeContext);

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedText, setSelectedText] = useState<string | undefined>(
        props.preselectedText
    );
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(
        props.preselectedCategory
    );

    const [categoryBorderColor, setCategoryBorderColor] = useState<string>(
        style.picker.borderColor
    );

    const [textBorderColor, setTextBorderColor] = useState<string>(
        style.autoCompleteContainer.borderColor
    );

    const isVisible = useRef(props.visible);

    useEffect(() => {
        // when the modal opens, the states needs a reset
        if (!isVisible.current && props.visible) {
            setSelectedText(props.preselectedText);
            setSelectedCategory(props.preselectedCategory);
            setCategoryBorderColor(style.picker.borderColor);
            setTextBorderColor(style.autoCompleteContainer.borderColor);
            setSuggestions([]);
        }
        isVisible.current = props.visible;
    }, [props.visible]);

    const handleChangeText = (text: string): void => {
        setSuggestions(
            text.length >= MIN_SUGGESTION_LENGHT
                ? allSuggestions.filter((suggestion) =>
                      suggestion.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())
                  )
                : []
        );
        setSelectedText(text);
    };

    const handleSuggestionSelected = (text: string): void => {
        setSelectedText(text);
        setSuggestions([]);
    };

    const handleCategorySelected = (category: ICategory): void => {
        setSelectedCategory(category);
    };

    const handleSave = (): void => {
        setCategoryBorderColor(
            selectedCategory ? style.picker.borderColor : theme.App.invalidInputBoarder
        );
        setTextBorderColor(
            selectedText
                ? style.autoCompleteContainer.borderColor
                : theme.App.invalidInputBoarder
        );
        if (selectedCategory && selectedText)
            props.onSave(selectedCategory, selectedText);
    };

    const renderItem = ({ item }: any): JSX.Element => (
        <TouchableRipple
            style={style.autoCompleteItemContainer}
            onPress={() => {
                handleSuggestionSelected(item);
            }}
        >
            <Text style={style.autoCompleteItemText}>{item}</Text>
        </TouchableRipple>
    );

    return (
        <Modal visible={props.visible} animationType="fade" transparent={true}>
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <Text style={style.headline}>{props.headline}</Text>
                    <CustomizedPicker
                        style={[style.picker, { borderColor: categoryBorderColor }]}
                        headerText={props.categoryPlaceholder}
                        placeholder={props.categoryPlaceholder}
                        itemList={props.categoryList}
                        getLabel={(category: ICategory) => category.text}
                        onItemChange={handleCategorySelected}
                        selectedItem={selectedCategory}
                    />
                    <Autocomplete
                        style={style.autoComplete}
                        inputContainerStyle={[
                            style.autoCompleteContainer,
                            { borderColor: textBorderColor },
                        ]}
                        listStyle={style.autoCompleteList}
                        data={suggestions}
                        value={selectedText}
                        placeholder={props.textPlaceholder}
                        onChangeText={handleChangeText}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                    />
                    <View style={style.buttonContainer}>
                        <View style={style.button}>
                            <Button title="cancel" onPress={props.onCancel} />
                        </View>
                        <View style={style.button}>
                            <Button title="save" onPress={handleSave} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TagEditor;
