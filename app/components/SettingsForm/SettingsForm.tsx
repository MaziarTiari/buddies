import React, { useContext } from "react";
import Form, { IFormField, InputType } from "../Form/Form";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { IThemeType } from "../../context/ThemeContext/ThemeLibrary/type";
import { useNavigation } from "@react-navigation/native";
import { Language } from "../../context/LanguageContext/LanguageLibrary/type";

const SettingsForm = () => {

    const navigation = useNavigation();

    const {
        changeLanguage,
        availableLanguages,
        language,
        translations
    } = useContext(LanguageContext);

    const {
        setThemeType,
        availableThemeTypes,
        themeType
    } = useContext(ThemeContext);

    navigation.setOptions({ title: translations.settings });

    enum Field { LANGUAGE, THEME };

    const fieldList: IFormField[] = [];

    fieldList[Field.LANGUAGE] = {
        inputType: InputType.SELECTOR,
        items: availableLanguages,
        required: true,
        initialValue: language,
        placeholder: translations.language,
        icon: "earth"
    };

    fieldList[Field.THEME] = {
        inputType: InputType.SELECTOR,
        items: availableThemeTypes,
        required: true,
        initialValue: themeType,
        placeholder: translations.theme,
        icon: "palette"
    };

    const handleSubmit = (data: string[]) => {
        changeLanguage(data[Field.LANGUAGE] as Language);
        setThemeType(data[Field.THEME] as IThemeType);
        navigation.goBack();
    };

    return <Form
        fieldList={fieldList}
        buttonTitle={translations.save}
        onSubmit={handleSubmit}
    />

};

export default SettingsForm;