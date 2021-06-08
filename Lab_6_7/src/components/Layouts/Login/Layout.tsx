import { useStyles } from './style';
import { ReactComponent as LogoSVG } from 'assets/img/pizza.svg';

const Layout: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <LogoSVG className={classes.logo} />
        </div>
        {children}
      </div>
    </main>
  );
};
export default Layout;
