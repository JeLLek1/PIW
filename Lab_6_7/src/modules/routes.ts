import Login from './Login';
import Register from './Register';

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
];
