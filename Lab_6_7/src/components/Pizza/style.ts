import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
  media: {
    height: 140,
  },
  main: {
    height: '100%',
    paddingBottom: '2.5rem',
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    bottom: '0.5rem',
    right: '0.5rem',
  },
}));
