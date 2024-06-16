import { createTheme } from '@mui/material';
import { Theme, responsiveFontSizes } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#735CFF',
    },
    secondary: {
      main: '#FF8585',
    },
    background: {
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

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
