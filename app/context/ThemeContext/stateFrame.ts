import { ITheme, IThemeStyle, themeStore } from './themeStore';

export interface IThemeContextState {
    availableThemes: ITheme[];
    theme: ITheme;
    changeTheme: (newTheme: ITheme) => void;
    style: IThemeStyle
}

const defaultTheme: ITheme = "dark";

export const initialThemeContextState: IThemeContextState = {
    availableThemes: Object.keys(themeStore) as ITheme[],
    theme: defaultTheme,
    changeTheme: () => console.warn('Function changeTheme not implemented'),
    style: themeStore[defaultTheme],
};
