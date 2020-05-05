import React, { useContext } from "react";
import { Text, Picker } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";
import { LanguageContext } from '../../../state-management-dev/LanguageContext'

const FeedList = () => {
    const lang = useContext(LanguageContext);
    return (
        <Container layout="screen_centered" style={{paddingTop:40}}>
            <Text style={{ color: Color.Theme.secondaryText }}>
              {lang.translations.headline}
            </Text>
            <LanguageSelector />
            <Text style={{ color: Color.Theme.secondaryText }}>
              <Greeting />
            </Text>
        </Container>
    );
};

export const Greeting = () => (
    <LanguageContext.Consumer>
      {contextValue => contextValue.translations.greeting}
    </LanguageContext.Consumer>
);
  
export const LanguageSelector = () => {
  const lang = useContext(LanguageContext);
  return (
    <Picker
      selectedValue={lang.language}
      style={{width:"100%", height:40, color:Color.Theme.primaryItem}}
      onValueChange={event => {
        lang.changeLanguage(event);
      }}
      itemStyle={{color: Color.Theme.secondaryText}}
    >
      {lang.availableLanguages.map((language, i) => (
        <Picker.Item 
          key={i} 
          label={("select language: " + language).toUpperCase()} value={language} />
      ))}
    </Picker>
  );
};

export default FeedList;
