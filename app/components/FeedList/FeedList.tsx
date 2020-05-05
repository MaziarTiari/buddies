import React, { useContext } from "react";
import { Text, Picker } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const FeedList = () => {
    const lang = useContext(LanguageContext);
    const theme = useContext(ThemeContext);
    return (
      <Container type="screen" layout="root" style={{paddingTop:40}}>
          <Text style={{ color: theme.style.App.primaryText }}>
            {lang.translations.menu_activities}
          </Text>
          <LanguageSelector />
          <Text style={{ color: Color.Theme.secondaryText }}>
          </Text>
      </Container>
    );
};

// TODO: only for demo porpuse - delete
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
