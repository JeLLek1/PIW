import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from 'config/theme';
import Main from 'modules/Main';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}

export default App;
