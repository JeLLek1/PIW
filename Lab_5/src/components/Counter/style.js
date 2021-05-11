import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  cardContent: {
    textAlign: 'center',
    padding: '1rem',
  },
  typography: {
    '&>b': {
      color: theme.palette.primary.main,
    },
  },
}));
