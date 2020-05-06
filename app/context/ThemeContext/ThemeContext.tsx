import React, { Component } from 'react'
import { createContext } from "react";
import { IThemeType, themeStore } from './themeStore';
import { initialThemeContextState, IThemeContextState } from './stateFrame';

export const ThemeContext = createContext(initialThemeContextState);

export default class ThemeContextProvider extends Component {
    changeTheme = (newTheme: IThemeType) => {
        this.setState({
            theme: themeStore[newTheme],
            themeType: newTheme 
        })
    }

    state: IThemeContextState = {
        ...initialThemeContextState,
        changeTheme: this.changeTheme
    }
    
    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
