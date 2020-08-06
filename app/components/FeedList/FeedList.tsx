import React, { useContext } from "react";
import { Text, TextInput } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Selector } from '../Selector/Selector'
import { Language } from "../../context/LanguageContext/Library/DictionaryScope";
import { IThemeType } from "../../context/ThemeContext/ThemeLibrary/type";

const FeedList = () => {
	const { availableLanguages, language, changeLanguage: setLanguage, translations} = 
		useContext(LanguageContext);
	const theme = useContext(ThemeContext);
    return (
		<Container type="screen" layout="root">
			<Container type="screen" layout="body">
					<Text style={{ color: theme.theme.App.primaryText }}>
						{translations.menu_activities}
					</Text>
					<Selector 
						items={availableLanguages} selectedItem={language} 
						onSelect={l => setLanguage(l as Language)} modalTitle="Select"
					/>
					<Selector
						placeholder={theme.themeType}
						items={theme.availableThemeTypes.map(t => t as string)} 
						selectedItem={theme.themeType as string}
						onSelect={l => theme.setThemeType(l as IThemeType)} 
						modalTitle="Select"
					/>
            </Container>
        </Container>
    );
};

export default FeedList;
