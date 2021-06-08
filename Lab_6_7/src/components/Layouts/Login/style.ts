import { makeStyles } from '@material-ui/core/styles';
import BackgroundIMG from 'assets/img/background.jpg';

export const useStyles = makeStyles(theme => ({
  main: {
    backgroundImage: `url(${BackgroundIMG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    paddingTop: '10rem',
    textAlign: 'center',
  },
  logoContainer: {},
  logo: {
    width: '6rem',
  },
  container: {
    width: '90%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: '4px 4px 6px 0px #000000',
  },
}));
