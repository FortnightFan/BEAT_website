// ThemeSwitcher.js
import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { useThemeContext } from './theme-context';

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          name="themeSwitch"
        />
      }
      label="Dark Mode"
    />
  );
};

export default ThemeSwitcher;
