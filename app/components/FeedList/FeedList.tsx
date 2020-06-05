import React, { useContext } from "react";
import { Text } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Language } from "../../context/LanguageContext/translationStore";
import { IThemeType } from "../../context/ThemeContext/themeStore";
import { Selector } from '../Selector/Selector'

const FeedList = () => {
    const lang = useContext(LanguageContext);
	const theme = useContext(ThemeContext);
    return (
		<Container type="screen" layout="root">
			<Container type="screen" layout="body">
				<Text style={{ color: theme.theme.App.primaryText }}>
					{lang.translations.menu_activities}
				</Text>
				<Selector 
					items={lang.availableLanguages} selectedItem={lang.language} 
					onSelect={l => lang.setLanguage(l as Language)} modalTitle="Select"
				/>
				<Selector
					style={{height: 100}}
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
