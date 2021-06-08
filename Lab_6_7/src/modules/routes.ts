import Login from './Login';
import Register from './Register';
import Home from './Home';

export const routes: IRoute[] = [
  {
    route: '/login',
    module: Login,
    accessType: 'notLogged',
  },
  {
    route: '/register',
    module: Register,
    accessType: 'notLogged',
  },
  {
    route: '/',
    module: Home,
    accessType: 'logged',
  },
];
