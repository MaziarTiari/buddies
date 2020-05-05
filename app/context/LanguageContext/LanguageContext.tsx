import React, { createContext, Component } from "react";
import { Language, translationStore } from "./translationStore";
import { languageContextInitialState, ILanguageContextState } from './stateFrame'

export const LanguageContext = createContext(languageContextInitialState);
  
export class LanguageContextProvider extends Component {
    changeLanguage = (newLanguage: Language) => {
      this.setState( {
        translations: translationStore[newLanguage],
        language: newLanguage
      });
    };
  
    state: ILanguageContextState = {
      ...languageContextInitialState,
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