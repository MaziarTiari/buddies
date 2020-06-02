import React, { useState, useRef, useEffect, useContext } from "react";
import { Modal, View, Text } from "react-native";
import CustomizedPicker from "../CustomizedPicker/CustomizedPicker";
import { TouchableRipple } from "react-native-paper";
import useStyle from "./CategorizedInputEditor.style";
import Autocomplete from "react-native-autocomplete-input";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { getResponsiveSize } from "../../utils/font/font";
import { Selector } from "../Selector/Selector";

export interface CategorizedInputEditorProps {
    visible: boolean;
    showDelete: boolean;
    onSave: (category: string, title: string, institution?: string) => void;
    onCancel: () => void;
    onDelete: () => void;
    categoryList: string[];
    headline: string;
    preselectedTitle?: string;
    preselectedCategory?: string;
    preselectedInstitution?: string;
    titlePlaceholder?: string;
    categoryPlaceholder?: string;
    institutionPlaceholder?: string;
}

const MIN_SUGGESTION_LENGHT = 3;
const allSuggestions = [
    "Musterfirma GmbH",
    "Musterfabrik AG",
    "Mustermann und Söhne",
    "Musterfirma Süd",
    "Musterfirma West",
    "Hochschule Worms",
    "Hochschule Heidelberg",
    "Hochschule Frankfurt a.M.",
    "Grundschule Worms",
]; // received from API later

const CategorizedInputEditor = (props: CategorizedInputEditorProps) => {
    const style = useStyle();
    const { theme } = useContext(ThemeContext);
    const { translations } = useContext(LanguageContext);

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | undefined>(
        props.preselectedTitle
    );
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
        props.preselectedCategory
    );
    const [selectedInstitution, setSelectedInstitution] = useState<string | undefined>(
        props.preselectedInstitution
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
            setSelectedTitle(props.preselectedTitle);
            setSelectedCategory(props.preselectedCategory);
            setSelectedInstitution(props.preselectedInstitution);
            setCategoryBorderColor(style.picker.borderColor);
            setTextBorderColor(style.autoCompleteContainer.borderColor);
            setSuggestions([]);
        }
        isVisible.current = props.visible;
    }, [props.visible]);

    const handleChangeTitle = (title: string): void => {
        setSuggestions(
            title.length >= MIN_SUGGESTION_LENGHT
                ? allSuggestions.filter((suggestion) =>
                      suggestion.toLocaleLowerCase().startsWith(title.toLocaleLowerCase())
                  )
                : []
        );
        setSelectedTitle(title);
    };

    const handleChangeInstitution = (institution: string): void => {
        setSelectedInstitution(institution);
    };

    const handleSuggestionSelected = (text: string): void => {
        setSelectedTitle(text);
        setSuggestions([]);
    };

    const handleCategorySelected = (category: string): void => {
        setSelectedCategory(category);
    };

    const handleSave = (): void => {
        setCategoryBorderColor(
            selectedCategory ? style.picker.borderColor : theme.App.invalidInputBoarder
        );
        setTextBorderColor(
            selectedTitle
                ? style.autoCompleteContainer.borderColor
                : theme.App.invalidInputBoarder
        );
        if (selectedCategory && selectedTitle)
            props.onSave(selectedCategory, selectedTitle, selectedInstitution);
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
                    <Selector
                        style={[style.picker, { borderColor: categoryBorderColor }]}
                        modalTitle={ props.categoryPlaceholder || ""}
                        placeholder={props.categoryPlaceholder}
                        items={[...props.categoryList, "sonstige"]}
                        //getLabel={(category) => category}
                        onSelect={handleCategorySelected}
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
                        value={selectedTitle}
                        placeholder={props.titlePlaceholder}
                        onChangeText={handleChangeTitle}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                    />
                    <InputField
                        containerStyle={style.autoCompleteContainer}
                        value={selectedInstitution}
                        placeholder={props.institutionPlaceholder}
                        onChangeText={handleChangeInstitution}
                    />
                    <View style={style.buttonContainer}>
                        <View>
                            {props.showDelete && (
                                <Button
                                    title={translations.button.delete}
                                    onPress={props.onDelete}
                                    isDangerous={true}
                                />
                            )}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Button
                                title={translations.button.cancel}
                                onPress={props.onCancel}
                                style={{ marginHorizontal: getResponsiveSize(5) }}
                            />
                            <Button
                                title={translations.button.save}
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CategorizedInputEditor;
