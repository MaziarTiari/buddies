import { Language, IMultiLangLineList, translationStore } from "./translationStore";

export const defaultLanguage: Language = "de";
  
export interface ILanguageContextState {
    availableLanguages: Language[];
    setLanguage: (newLanguage: Language) => void;
    language: Language;
    translations: IMultiLangLineList;
}

export const languageContextInitialState: ILanguageContextState = {
    availableLanguages: Object.keys(translationStore) as Language[],
    setLanguage: () => {
      console.warn("Funktion changeLanguage() nicht implementiert!");
    },
    language: defaultLanguage,
    translations: translationStore[defaultLanguage]
};