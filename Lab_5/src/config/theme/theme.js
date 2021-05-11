import { createMuiTheme } from '@material-ui/core';
import * as fonts from './fonts';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#38786a',
      main: '#004c3f',
      dark: '#002419',
      contrastText: '#fff',
    },
    secondary: {
      light: '#aab6fe',
      main: '#7986cb',
      dark: '#49599a',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    fontSize: 16,
    h3: {
      fontSize: '2.3rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
    },
  },
});

theme.overrides = {
  MuiCssBaseline: {
    '@global': {
      '@font-face': [fonts.LatoRegular],
    },
  },
  MuiAutocomplete: {
    listbox: {
      '&::-webkit-scrollbar-track': {},
      '&::-webkit-scrollbar': {
        width: '5px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '10px',
      },
    },
  },
  MuiTypography: {
    paragraph: {
      marginBottom: '0.5rem',
    },
  },
};

export default theme;
