import { ThemeProvider, CssBaseline } from '@material-ui/core';
import routes from 'modules/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from 'config/theme';
import NotFound from 'modules/NotFound/NotFound';
import Layout from 'components/Layout/Main';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Layout>
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                exact
                path={route.path}
                component={route.module}
              />
            ))}
            <Route key="404" path="" component={NotFound} />
            <Route key="404-1" path="404" component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
