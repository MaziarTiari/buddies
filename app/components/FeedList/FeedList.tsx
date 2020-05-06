import React, { useContext } from "react";
import { Text, Picker, StyleProp, TextStyle } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const FeedList = () => {
    const lang = useContext(LanguageContext);
    const {theme, changeTheme, availableThemeTypes, themeType} = useContext(ThemeContext);
    return (
		<Container type="screen" layout="root" style={{paddingTop:40}}>
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
    );
};

interface SelectorProps<T> {
	items: T[];
	selectedItem: T
	function: (newItem: T) => void
	style?: StyleProp<TextStyle>
}
function Selector<T>( Props: SelectorProps<T>) {
	const style = useContext(ThemeContext).theme;
	return (
		<Picker
			selectedValue={Props.selectedItem}
			style={[{width:100, height:40, color: style.App.primaryItem,}, Props.style]}
			onValueChange={event => {
				Props.function(event);
			}}
			itemStyle={{color: style.App.secondaryText}}
		>
			{Props.items.map((item, i) => (
				<Picker.Item 
				key={i} 
				label={(item as unknown as string)} value={item} />
			))}
		</Picker>
	);
}

export default FeedList;
