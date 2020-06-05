import React, { useState, ReactNode } from 'react'
import { createContext } from "react";
import { initialThemeContextState } from './stateFrame';

export const ThemeContext = createContext(initialThemeContextState);

const ThemeContextProvider = (props: {children: ReactNode}) => {
    const [themeType, setThemeType] = useState(initialThemeContextState.themeType);
    const value = { ...initialThemeContextState, themeType, setThemeType };
    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;
