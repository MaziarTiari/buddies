import React, { useContext } from "react";
import { Text } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Selector } from "../Selector/Selector";
import { Language } from "../../context/LanguageContext/translationStore";
import { IThemeType } from "../../context/ThemeContext/themeStore";

const FeedList = () => {
    const lang = useContext(LanguageContext);
    const {theme, changeTheme, availableThemeTypes, themeType} = useContext(ThemeContext);
    return (
		<Container type="screen" layout="root">
			<Container type="screen" layout="body">
			<Text style={{ color: theme.App.primaryText }}>
				{lang.translations.menu_activities}
			</Text>
			<Selector 
				items={lang.availableLanguages} selectedItem={lang.language} 
				onSelect={l => lang.changeLanguage(l as Language)} modalTitle="Select"
			/>
			<Selector 
					items={availableThemeTypes} selectedItem={themeType} 
					onSelect={l => changeTheme(l as IThemeType)} modalTitle="Select"
			/>
			<Text style={{ color: theme.App.secondaryText }}>
			
			</Text>
			</Container>
		</Container>
    );
};

export default FeedList;
