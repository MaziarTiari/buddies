import React from "react";
import { Text, Picker } from "react-native";
import Color from "../../utils/theme/color";
import Container from "../Container/Container";
import { LanguageContext } from '../../../state-management-dev/LanguageContext'

const FeedList = () => {
    return (
        <Container layout="screen_centered" style={{paddingTop:40}}>
            <Text style={{ color: Color.Theme.secondaryText }}>Select Language:</Text>
            <LanguageSelector />
            <Text style={{ color: Color.Theme.secondaryText }}><Greeting /></Text>
            {/* <Text style={{ color: Color.Theme.secondaryText }}>Feed</Text> */}
        </Container>
    );
};

export const Greeting = () => (
    <LanguageContext.Consumer>
      {contextValue => contextValue.translations.greeting}
    </LanguageContext.Consumer>
);
  
export const Headline = () => (
    <LanguageContext.Consumer>
      {contextValue => contextValue.translations.headline}
    </LanguageContext.Consumer>
);
  
export const LanguageSelector = () => {
    return (
      <LanguageContext.Consumer>
        {contextValue => (
          <Picker
            selectedValue={contextValue.language}
            style={{width:"100%", height:40, color:Color.Theme.primaryItem}}
            onValueChange={event => {
              contextValue.changeLanguage(event);
            }}
            itemStyle={{color: Color.Theme.secondaryText}}
          >
            {contextValue.availableLanguages.map((language, i) => (
              <Picker.Item 
                key={i} 
                label={("select language: " + language).toUpperCase()} value={language} />
            ))}
          </Picker>
        )}
      </LanguageContext.Consumer>
    );
};

export default FeedList;
