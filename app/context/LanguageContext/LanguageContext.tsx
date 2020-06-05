import React, { createContext, useState, ReactNode } from "react";
import { Language, translationStore } from "./translationStore";
import { languageContextInitialState, defaultLanguage, ILanguageContextState } from './stateFrame'

export const LanguageContextProvider = ( props: {children: ReactNode}) => {
	const [language, setLanguage] = useState<Language>(defaultLanguage)
	const translations = translationStore[language];
	const value: ILanguageContextState = 
		{ ...languageContextInitialState,language, setLanguage, translations }
	
	return (
		<LanguageContext.Provider value={value}>
			{props.children}
		</LanguageContext.Provider>
	);
}

export const LanguageContext = createContext(languageContextInitialState);