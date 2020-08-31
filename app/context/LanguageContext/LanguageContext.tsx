import React, { createContext, useState, ReactNode } from 'react';
import { library } from './LanguageLibrary';
import {
    initLanguageContextModel,
    defaultLanguage,
    ILanguageContextModel
} from './languageContextModel';
import { Language } from './LanguageLibrary/type';

export const LanguageContextProvider = (props: { children: ReactNode }) => {
    const [language, changeLanguage] = useState<Language>(defaultLanguage);
    const translations = library[language];

    const value: ILanguageContextModel = {
        ...initLanguageContextModel,
        language,
        changeLanguage: changeLanguage,
        translations
    };

    return (
        <LanguageContext.Provider value={value}>
            {props.children}
        </LanguageContext.Provider>
    );
};

export const LanguageContext = createContext(initLanguageContextModel);
