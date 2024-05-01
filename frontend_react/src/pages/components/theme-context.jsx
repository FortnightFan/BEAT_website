import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const storedTheme = localStorage.getItem('themeMode');
    return storedTheme ? storedTheme : 'light';
  });

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

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
