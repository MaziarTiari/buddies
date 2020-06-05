import React, { useContext } from "react";
import { Text, TextInput } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { Language } from "../../context/LanguageContext/translationStore";
import { IThemeType } from "../../context/ThemeContext/themeStore";
import { Selector } from '../Selector/Selector'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getResponsiveSize } from "../../utils/font/font";
import FormInput from "../FormInput/FormInput";
import ChatInput from "../ChatInput/ChatInput";

const FeedList = () => {
	const { availableLanguages, language, setLanguage, translations} = 
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
