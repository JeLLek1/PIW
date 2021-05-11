import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  title: {
    display: 'inline-block',
    position: 'relative',
    marginBottom: '2rem',
    padding: '0 1rem 0.3rem 0',
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.palette.primary.main,
      width: '100%',
      height: '2px',
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
  },
}));
