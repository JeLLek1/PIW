interface IRoute {
  route: string;
  module: (props: any) => JSX.Element;
  accessType: 'notLogged' | 'logged';
}
