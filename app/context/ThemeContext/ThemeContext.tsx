import React, { Component } from 'react'
import { createContext } from "react";
import { ITheme, themeStore } from './themeStore';
import { initialThemeContextState, IThemeContextState } from './stateFrame';

export const ThemeContext = createContext(initialThemeContextState);

export default class ThemeContextProvider extends Component {
    changeTheme(newTheme: ITheme) {
        this.setState({
            theme: newTheme,
            style: themeStore[newTheme]
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
