import React, { useState, useEffect, useContext } from "react";
import { Modal, View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import useStyle from "./CategorizedInputEditor.style";
import Autocomplete from "react-native-autocomplete-input";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import Button from "../Button/Button";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { getResponsiveSize } from "../../utils/font/font";
import FormSelectorInput from "../FormSelectorInput/FormSelectorInput";

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
const receivedInstitutionSuggestions = [
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
const receivedTitleSuggestions = [
    "Angewandte Informatik",
    "Technische Informatik",
    "Theoretische Informatik",
]; // received from API later

const CategorizedInputEditor = (props: CategorizedInputEditorProps) => {
    const style = useStyle();
    const { theme } = useContext(ThemeContext);
    const { translations } = useContext(LanguageContext);

    const [institutionSuggestions, setInstitutionSuggestions] = useState<string[]>([]);
    const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
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
        style.autoCompleteContainer.borderColor // TODO
    );
    const [textBorderColor, setTitleBorderColor] = useState<string>(
        style.autoCompleteContainer.borderColor
    );

    useEffect(() => {
        setSelectedTitle(props.preselectedTitle);
        setSelectedCategory(props.preselectedCategory);
        setSelectedInstitution(props.preselectedInstitution);
        setCategoryBorderColor(style.autoCompleteContainer.borderColor); // TODO
        setTitleBorderColor(style.autoCompleteContainer.borderColor);
        setTitleSuggestions([]);
        setInstitutionSuggestions([]);
    }, [props.visible]);

    const handleCategorySelected = (category: string): void => {
        setSelectedCategory(category);
    };

    const handleChangeTitle = (title: string): void => {
        setTitleSuggestions(
            title.length >= MIN_SUGGESTION_LENGHT
                ? receivedTitleSuggestions.filter((suggestion) =>
                    suggestion.toLocaleLowerCase().startsWith(title.toLocaleLowerCase())
                )
                : []
        );
        setSelectedTitle(title);
    };

    const handleChangeInstitution = (institution: string): void => {
        setInstitutionSuggestions(
            institution.length >= MIN_SUGGESTION_LENGHT
                ? receivedInstitutionSuggestions.filter((suggestion) =>
                    suggestion.toLocaleLowerCase().startsWith(institution.toLocaleLowerCase())
                )
                : []
        );
        setSelectedInstitution(institution);
    };

    const handleTitleSuggestionSelected = (text: string): void => {
        setSelectedTitle(text);
        setTitleSuggestions([]);
    };

    const handleInstitutionSuggestionSelected = (text: string): void => {
        setSelectedInstitution(text);
        setInstitutionSuggestions([]);
    }

    const handleSave = (): void => {
        setCategoryBorderColor(
            selectedCategory
                ? style.autoCompleteContainer.borderColor // TODO
                : theme.App.errorColor
        );
        setTitleBorderColor(
            selectedTitle
                ? style.autoCompleteContainer.borderColor
                : theme.App.errorColor
        );
        if (selectedCategory && selectedTitle)
            props.onSave(selectedCategory, selectedTitle, selectedInstitution);
    };

    const renderAutocompleteItem = (text: string, onPress: (text: string) => void): JSX.Element => (
        <TouchableRipple
            style={style.autoCompleteItemContainer}
            onPress={() => onPress(text)}
        >
            <Text style={style.autoCompleteItemText}>{text}</Text>
        </TouchableRipple>
    );

    return (
        <Modal visible={props.visible} animationType="fade" transparent={true}>
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <Text style={style.headline}>{props.headline}</Text>
                    <FormSelectorInput
                        style={[style.picker, { borderColor: categoryBorderColor }]}
                        modalTitle={props.categoryPlaceholder || ""}
                        placeholder={props.categoryPlaceholder}
                        items={props.categoryList}
                        onSelect={handleCategorySelected}
                        selectedItem={selectedCategory}
                        editable
                    />
                    <Autocomplete
                        style={style.autoComplete}
                        inputContainerStyle={[
                            style.autoCompleteContainer,
                            { borderColor: textBorderColor },
                        ]}
                        listStyle={style.autoCompleteList}
                        data={titleSuggestions}
                        value={selectedTitle}
                        placeholder={props.titlePlaceholder}
                        onChangeText={handleChangeTitle}
                        renderItem={(item) => renderAutocompleteItem(item.item, handleTitleSuggestionSelected)}
                        keyExtractor={(item) => item}
                    />
                    <Autocomplete
                        style={style.autoComplete}
                        inputContainerStyle={style.autoCompleteContainer}
                        listStyle={style.autoCompleteList}
                        data={institutionSuggestions}
                        value={selectedInstitution}
                        placeholder={props.institutionPlaceholder}
                        onChangeText={handleChangeInstitution}
                        renderItem={(item) => renderAutocompleteItem(item.item, handleInstitutionSuggestionSelected)}
                        keyExtractor={(item) => item}
                    />
                    <View style={style.buttonContainer}>
                        <View>
                            {props.showDelete && (
                                <Button
                                    style={style.button}
                                    textStyle={style.buttonText}
                                    title={translations.delete}
                                    onPress={props.onDelete}
                                    isDangerous={true}
                                />
                            )}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Button
                                style={[style.button, { marginHorizontal: getResponsiveSize(5) }]}
                                textStyle={style.buttonText}
                                title={translations.cancel}
                                onPress={props.onCancel}
                            />
                            <Button
                                style={style.button}
                                textStyle={style.buttonText}
                                title={translations.save}
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
