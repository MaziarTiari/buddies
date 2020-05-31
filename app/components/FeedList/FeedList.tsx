import React, { useContext } from "react";
import { Text } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Selector } from "../Selector/Selector";

const FeedList = () => {
    const lang = useContext(LanguageContext);
    const {theme, changeTheme, availableThemeTypes, themeType} = useContext(ThemeContext);
    return (
		<Container type="screen" layout="root" style={{paddingTop:40}}>
			<Container type="screen" layout="body">
			<Text style={{ color: theme.App.primaryText }}>
				{lang.translations.menu_activities}
			</Text>
			<Selector items={lang.availableLanguages} selectedItem={lang.language} 
						function={lang.changeLanguage}
			/>
			<Selector items={availableThemeTypes} selectedItem={themeType} 
						function={changeTheme}
			/>
			<Text style={{ color: theme.App.secondaryText }}>
			
			</Text>
			</Container>
		</Container>
    );
};

export default FeedList;
