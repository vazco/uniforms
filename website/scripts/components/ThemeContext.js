import { createContext } from 'react';

export const themeContext = createContext('unstyled');

export const ThemeProvider = themeContext.Provider;
