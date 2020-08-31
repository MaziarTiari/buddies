import { library } from "./LanguageLibrary";
import { Language, Dictionary } from "./LanguageLibrary/type";

export const defaultLanguage: Language = "de";

export interface ILanguageContextModel {
  availableLanguages: Language[];
  changeLanguage: (newLanguage: Language) => void;
  language: Language;
  translations: Dictionary;
}

export const initLanguageContextModel: ILanguageContextModel = {
  availableLanguages: Object.keys(library) as Language[],
  changeLanguage: () => {
    console.warn("changeLanguage() not implemented!");
  },
  language: defaultLanguage,
  translations: library[defaultLanguage]
};