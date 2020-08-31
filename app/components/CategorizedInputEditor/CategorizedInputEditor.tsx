import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, Text } from 'react-native';
import { TouchableRipple, IconButton } from 'react-native-paper';
import useCategorizedInputEditorStyle from './CategorizedInputEditor.style';
import Autocomplete from 'react-native-autocomplete-input';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import Button from '../Button/Button';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { getResponsiveSize } from '../../utils/font/font';
import FormSelectorInput from '../FormSelectorInput/FormSelectorInput';
import { If } from 'react-if';

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
    'Musterfirma GmbH',
    'Musterfabrik AG',
    'Mustermann und Söhne',
    'Musterfirma Süd',
    'Musterfirma West',
    'Hochschule Worms',
    'Hochschule Heidelberg',
    'Hochschule Frankfurt a.M.',
    'Grundschule Worms'
]; // received from API later
const receivedTitleSuggestions = [
    'Angewandte Informatik',
    'Technische Informatik',
    'Theoretische Informatik'
]; // received from API later

const CategorizedInputEditor = (props: CategorizedInputEditorProps) => {
    const styles = useCategorizedInputEditorStyle();
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
    const [categoryShowError, setCategoryShowError] = useState(false);
    const [titleShowError, setTitleShowError] = useState(false);

    useEffect(() => {
        setSelectedTitle(props.preselectedTitle);
        setSelectedCategory(props.preselectedCategory);
        setSelectedInstitution(props.preselectedInstitution);
        setTitleShowError(false);
        setCategoryShowError(false);
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
                      suggestion
                          .toLocaleLowerCase()
                          .startsWith(title.toLocaleLowerCase())
                  )
                : []
        );
        setTitleShowError(title === "");
        setSelectedTitle(title);
    };

    const handleChangeInstitution = (institution: string): void => {
        setInstitutionSuggestions(
            institution.length >= MIN_SUGGESTION_LENGHT
                ? receivedInstitutionSuggestions.filter((suggestion) =>
                      suggestion
                          .toLocaleLowerCase()
                          .startsWith(institution.toLocaleLowerCase())
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
    };

    const handleSave = (): void => {
        setCategoryShowError(!selectedCategory);
        setTitleShowError(!selectedTitle);
        if (selectedCategory && selectedTitle) {
            props.onSave(selectedCategory, selectedTitle, selectedInstitution);
        }
    };

    const renderAutocompleteItem = (
        text: string,
        onPress: (text: string) => void
    ): JSX.Element => (
        <TouchableRipple
            style={styles.autoCompleteItemContainer}
            onPress={() => onPress(text)}
        >
            <Text style={styles.autoCompleteItemText}>{text}</Text>
        </TouchableRipple>
    );

    return (
        <Modal visible={props.visible} animationType="fade" transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.headline}>{props.headline}</Text>
                    <FormSelectorInput
                        inputStyle={styles.pickerInput}
                        hasError={categoryShowError}
                        modalTitle={props.categoryPlaceholder || ''}
                        placeholder={props.categoryPlaceholder}
                        items={props.categoryList}
                        onSelect={handleCategorySelected}
                        selectedItem={selectedCategory}
                        editable
                    />
                    <Autocomplete
                        placeholderTextColor={theme.App.secondaryText}
                        style={styles.autoComplete}
                        inputContainerStyle={[
                            styles.autoCompleteContainer,
                            titleShowError && {borderColor: theme.App.errorColor}
                        ]}
                        listStyle={styles.autoCompleteList}
                        data={titleSuggestions}
                        value={selectedTitle}
                        placeholder={props.titlePlaceholder}
                        onChangeText={handleChangeTitle}
                        renderItem={(item) =>
                            renderAutocompleteItem(
                                item.item,
                                handleTitleSuggestionSelected
                            )
                        }
                        keyExtractor={(item) => item}
                    />
                    <Autocomplete
                        style={styles.autoComplete}
                        placeholderTextColor={theme.App.secondaryText}
                        inputContainerStyle={[
                            styles.autoCompleteContainer,
                            {marginTop: getResponsiveSize(20)}
                        ]}
                        listStyle={styles.autoCompleteList}
                        data={institutionSuggestions}
                        value={selectedInstitution}
                        placeholder={props.institutionPlaceholder}
                        onChangeText={handleChangeInstitution}
                        renderItem={(item) =>
                            renderAutocompleteItem(
                                item.item,
                                handleInstitutionSuggestionSelected
                            )
                        }
                        keyExtractor={(item) => item}
                    />
                    <View style={styles.buttonContainer}>
                        <View>
                            <If condition={props.showDelete}>
                                <IconButton
                                    icon="delete-forever"
                                    size={getResponsiveSize(30)}
                                    color={theme.App.rejectColor}
                                    onPress={props.onDelete}
                                />
                            </If>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                style={{
                                    ...styles.button, 
                                    ...{marginRight: getResponsiveSize(15), backgroundColor: "#919191"}
                                }}
                                type="secondary"
                                textStyle={styles.buttonText}
                                title={translations.cancel}
                                onPress={props.onCancel}
                            />
                            <Button
                                style={styles.button}
                                textStyle={styles.buttonText}
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
