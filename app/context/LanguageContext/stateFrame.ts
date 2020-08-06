import { library } from "./Library";
import { Language, Dictionary } from "./Library/DictionaryScope";

export const defaultLanguage: Language = "de";

export interface ILanguageContextState {
  availableLanguages: Language[];
  changeLanguage: (newLanguage: Language) => void;
  language: Language;
  translations: Dictionary;
}

export const initialState: ILanguageContextState = {
  availableLanguages: Object.keys(library) as Language[],
  changeLanguage: () => {
    console.warn("changeLanguage() not implemented!");
  },
  language: defaultLanguage,
  translations: library[defaultLanguage]
};