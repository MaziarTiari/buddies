import { Picker } from "react-native";
import React, { createContext, Component } from "react";

interface IMultiLangLineList {
    greeting: string;
    headline: string;
}

type Language = 'de' | 'en';

interface TranslationStore {
    de: IMultiLangLineList;
    en: IMultiLangLineList;
}

const translationStore: TranslationStore = {
    de: {
      greeting: "Guten Tag!",
      headline: "Heute lernen wir, wie Context funktioniert."
    },
    en: {
      greeting: "Good day!",
      headline: "Today we learn how context works."
    }
};
  
const defaultLanguage: Language = "de";
  
interface ILanguageContext {
    availableLanguages: Language[];
    changeLanguage: (newLanguage: Language) => void;
    language: Language;
    translations: IMultiLangLineList;
}

const defaultLanguageContextValue: ILanguageContext = {
    availableLanguages: Object.keys(translationStore) as Language[],
    changeLanguage: () => {
      console.warn("Funktion changeLanguage() nicht implementiert!");
    },
    language: defaultLanguage,
    translations: translationStore[defaultLanguage]
};
  
export const LanguageContext = createContext(defaultLanguageContextValue);
  
export class Localized extends Component {
    changeLanguage = (newLanguage: Language) => {
      this.setState(state => ({
        translations: translationStore[newLanguage],
        language: newLanguage
      }));
    };
  
    state: ILanguageContext = {
      ...defaultLanguageContextValue,
      changeLanguage: this.changeLanguage
    };
  
    render() {
      return (
        <LanguageContext.Provider value={this.state}>
          {this.props.children}
        </LanguageContext.Provider>
      );
    }
}