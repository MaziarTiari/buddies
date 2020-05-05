import { Language, IMultiLangLineList, translationStore } from "./translationStore";

const defaultLanguage: Language = "de";
  
export interface ILanguageContextState {
    availableLanguages: Language[];
    changeLanguage: (newLanguage: Language) => void;
    language: Language;
    translations: IMultiLangLineList;
}

export const languageContextInitialState: ILanguageContextState = {
    availableLanguages: Object.keys(translationStore) as Language[],
    changeLanguage: () => {
      console.warn("Funktion changeLanguage() nicht implementiert!");
    },
    language: defaultLanguage,
    translations: translationStore[defaultLanguage]
};