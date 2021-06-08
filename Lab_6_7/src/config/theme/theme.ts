import { createMuiTheme } from '@material-ui/core';
import * as fonts from './fonts';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#255d00',
      main: '#558b2f',
      dark: '#85bb5c',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffd95a',
      main: '#f9a825',
      dark: '#c17900',
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
      '@font-face': [fonts.RalewayRegular],
    },
  },
  MuiTypography: {
    paragraph: {
      marginBottom: '0.5rem',
    },
  },
};

export default theme;
