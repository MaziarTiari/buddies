import { IThemeType, ITheme, themeStore } from './themeStore';

export interface IThemeContextState {
    availableThemeTypes: IThemeType[];
    themeType: IThemeType;
    changeTheme: (newTheme: IThemeType) => void;
    theme: ITheme
}

const defaultTheme: IThemeType = "dark";

export const initialThemeContextState: IThemeContextState = {
    availableThemeTypes: Object.keys(themeStore) as IThemeType[],
    themeType: defaultTheme,
    changeTheme: () => console.warn('Function changeTheme not implemented'),
    theme: themeStore[defaultTheme],
};
