import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '2rem',
  },
  avatar: {
    float: 'left',
    width: '5rem',
    height: '5rem',
    backgroundColor: theme.palette.primary.light,
    margin: '0 1rem 0.5rem 0',
  },
  arrow: {
    verticalAlign: 'middle',
    paddingBottom: '0.3rem',
    fill: theme.palette.primary.main,
  },
  actions: {
    paddingTop: 0,
  },
  button: {
    cursor: 'default',
    margin: '0.3rem 0.3rem 0 0',
  },
  buttonSend: {
    float: 'right',
    marginLeft: '1rem',
  },
  box: {
    width: '100%',
  },
  content: {
    '&::after': {
      content: '""',
      display: 'block',
      clear: 'both',
    },
  },
}));
