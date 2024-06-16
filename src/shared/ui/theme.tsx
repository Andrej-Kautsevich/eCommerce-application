import { PaletteMode, createTheme } from '@mui/material';
import { Theme, responsiveFontSizes } from '@mui/material/styles';

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#735CFF',
    },
    secondary: {
      main: '#FF8585',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F9FAFE',
    },
    text: {
      primary: '#000000',
      secondary: '#939393',
      disabled: '#939393',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Orbitron', sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#301cb7',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#939393',
      disabled: '#939393',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Orbitron', sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const getTheme = (mode: PaletteMode) => {
  const theme = mode === 'light' ? lightTheme : darkTheme;
  const responsiveTheme = responsiveFontSizes(theme);
  return responsiveTheme;
};

export default getTheme;
