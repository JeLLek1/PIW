import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
  item: {
    minWidth: '20rem',
    padding: '0.5rem 4rem 0.5rem 1rem',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 'calc(100% - 2rem)',
      height: '1px',
      backgroundColor: theme.palette.primary.main,
    },
  },
  deleteButton: {
    position: 'absolute',
    right: '1rem',
    top: 0,
    bottom: 0,
    margin: 'auto 0',
    height: '2rem',
    width: '2rem',
  },
}));
