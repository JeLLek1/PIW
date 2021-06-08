import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  logoWrapper: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: '3rem',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '0.5rem',
  },
  logoTitle: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  userLogo: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  main: {
    paddingTop: '7rem',
  },
  spaceCartItem: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  textSum: {
    padding: '0.5rem 0',
  },
}));
