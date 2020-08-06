import { themeLibrary } from './ThemeLibrary';
import { IThemeType, ITheme } from './ThemeLibrary/type';

export interface IThemeContextState {
    availableThemeTypes: IThemeType[];
    themeType: IThemeType;
    setThemeType: (newTheme: IThemeType) => void;
    theme: ITheme
}

const defaultTheme: IThemeType = "dark";

export const initialState: IThemeContextState = {
    availableThemeTypes: Object.keys(themeLibrary) as IThemeType[],
    themeType: defaultTheme,
    setThemeType: () => console.warn('setThemeType() not implemented'),
    theme: themeLibrary[defaultTheme],
};
