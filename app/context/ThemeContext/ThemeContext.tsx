import React, { useState, ReactNode } from 'react'
import { createContext } from "react";
import { themeContextModel, IThemeContextModel } from './themeContextModel';
import { themeLibrary } from './ThemeLibrary';
import { IThemeType } from './ThemeLibrary/type';
// end import /////////////////////////////////////////////////////////////////

export const ThemeContext = createContext(themeContextModel);

/******************************************************************************
 * provides theme context
 * @param props children as consumer of this context
 * @returns object {  
 *      availableThemeTypes:    list of all theme types     
 *      theme
 *      themeType:  i.g. dark, light....      
 *      setThemeType
 * }
 * 
 */
export default function ThemeContextProvider (props: {children: ReactNode}) {
    
    const [themeType, setThemeType] = useState<IThemeType>(themeContextModel.themeType);
    const theme = themeLibrary[themeType];
    
    const value: IThemeContextModel = { 
        ...themeContextModel, 
        theme, 
        themeType, 
        setThemeType,
    };

    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}
