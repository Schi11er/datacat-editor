import { Theme } from '@mui/material/styles';
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';

// Function to get theme based on mode
export const getTheme = (darkMode: boolean): Theme => {
  return darkMode ? darkTheme : lightTheme;
};