import React, { createContext, useState, ReactNode } from "react";
import { Language, translationStore } from "./translationStore";
import { languageContextInitialState, defaultLanguage } from './stateFrame'

export const LanguageContextProvider = ( props: {children: ReactNode}) => {
	const [language, setLanguage] = useState<Language>(defaultLanguage)
	const value = { ...languageContextInitialState, language, setLanguage }
	
	return (
		<LanguageContext.Provider value={value}>
			{props.children}
		</LanguageContext.Provider>
	);
}

export const LanguageContext = createContext(languageContextInitialState);