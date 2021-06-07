import { useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
  accessType: 'notLogged' | 'logged';
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  accessType,
  ...rest
}: IPrivateRouteProps) => {
  return <Route {...rest} component={Component} />;
};

export default PrivateRoute;
