import React, { createContext, useState, ReactNode } from "react";							
import { library } from "./Library";			
import {
	initialState, 		
	defaultLanguage, 					
	ILanguageContextState } from './stateFrame'					
import { Language } from "./Library/DictionaryScope";
// end import /////////////////////////////////////////////////////////////


/**
 * provides language context
 * @param props children as consumer of this context
 * @returns object {	
 * 		availableLanguages,		
 * 		language,	
 * 		changeLanguage,		
 * 		translations	
 * }
 */
export const LanguageContextProvider = ( props: {children: ReactNode}) => {
	const [language, changeLanguage] = useState<Language>(defaultLanguage)
	const translations = library[language];
	
	const value: ILanguageContextState = { 
		...initialState,
		language, 
		changeLanguage: changeLanguage, 
		translations 
	}
	
	return (
		<LanguageContext.Provider value={value}>
			{props.children}
		</LanguageContext.Provider>
	);
}

export const LanguageContext = createContext(initialState);