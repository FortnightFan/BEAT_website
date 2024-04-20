// theme-context.js
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  // Initialize theme mode from local storage or default to 'light'
  const [mode, setMode] = useState(() => {
    const storedTheme = localStorage.getItem('themeMode');
    return storedTheme ? storedTheme : 'light';
  });

  // Create the theme instance based on the mode
  const theme = createTheme({
    palette: {
      mode,
      // Define other palette properties if necessary
    },
    // Define other theme overrides if necessary
  });

  // Toggle theme and store selection in local storage
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode); // Persist theme mode in local storage
      return newMode;
    });
  };

  // UseEffect to update theme based on local storage directly if needed
  useEffect(() => {
    const storedTheme = localStorage.getItem('themeMode');
    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
