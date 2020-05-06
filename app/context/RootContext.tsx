import React, { Component } from 'react'
import { LanguageContextProvider } from './LanguageContext/LanguageContext'
import ThemeContextProvider from './ThemeContext/ThemeContext'

export default class RootContextProvider extends Component {
    render() {
        return (
            <LanguageContextProvider>
                <ThemeContextProvider>
                    {this.props.children}
                </ThemeContextProvider>
            </LanguageContextProvider>
        )
    }
}
