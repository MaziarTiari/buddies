import React, { useState, ReactNode } from 'react'
import { createContext } from "react";
import { initialThemeContextState, IThemeContextState } from './stateFrame';
import { themeStore } from './themeStore';

export const ThemeContext = createContext(initialThemeContextState);

const ThemeContextProvider = (props: {children: ReactNode}) => {
    const [themeType, setThemeType] = useState(initialThemeContextState.themeType);
    const theme = themeStore[themeType];
    const value: IThemeContextState = { 
        ...initialThemeContextState, theme, themeType, setThemeType,
    };
    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;
