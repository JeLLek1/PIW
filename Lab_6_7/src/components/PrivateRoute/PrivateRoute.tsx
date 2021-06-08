import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectors from 'store/selectors';

interface IPrivateRouteProps extends RouteProps {
  accessType: 'notLogged' | 'logged';
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  accessType,
  ...rest
}: IPrivateRouteProps) => {
  const login: ILoginState = useSelector(selectors.getLogin);
  if (login.isLoading) return <>{console.log('loading...')}</>;
  else if (login.user === null && accessType === 'logged') {
    return <Redirect to="/login"></Redirect>;
  } else if (login.user !== null && accessType === 'notLogged')
    return <Redirect to="/"></Redirect>;
  else return <Route {...rest} component={Component} />;
};

export default PrivateRoute;
