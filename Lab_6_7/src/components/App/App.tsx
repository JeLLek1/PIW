import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from 'config/theme';
import { routes } from 'modules/routes';
import Error404 from 'modules/Error404';
import PrivateRoute from 'components/PrivateRoute';
import { useApp } from './utils';

function App() {
  useApp();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          {routes.map((route: IRoute, i: number) => (
            <PrivateRoute
              key={i}
              exact
              path={route.route}
              accessType={route.accessType}
              render={props => <route.module {...props} />}
            />
          ))}
          <Route key="route-error-404" path="" component={Error404} />
          <Route key="route-error-404" path="404" component={Error404} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
