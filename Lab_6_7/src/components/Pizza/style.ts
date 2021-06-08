import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
  media: {
    height: 140,
  },
  main: {
    height: '100%',
    paddingBottom: '4.5rem',
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    bottom: '0.5rem',
    left: '0.5rem',
    width: 'calc(100% - 1rem)',
  },
  addToCart: {
    position: 'absolute',
    height: '2.5rem',
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
}));
