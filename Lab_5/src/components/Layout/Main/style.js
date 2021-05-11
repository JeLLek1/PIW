import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuIconClosed: {
    transition: 'transform 0.3s',
    transform: 'rotate(0deg)',
  },
  menuIconOpen: {
    transition: 'transform 0.3s',
    transform: 'rotate(180deg)',
  },
  menuTitle: {
    marginLeft: '1rem',
  },
  drawer: {
    width: 220,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 4,
  },
  main: {
    marginTop: '3rem',
    marginBottom: '3rem',
  },
  mainOpen: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin-left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mainClose: {
    width: `calc(100% - ${theme.spacing(7) + 4}px)`,
    marginLeft: theme.spacing(7) + 4,
    transition: theme.transitions.create(['width', 'margin-left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  navLink: {
    '&.active': {
      backgroundColor: theme.palette.primary.light,
      '&>*': {
        color: theme.palette.primary.contrastText,
      },
    },
  },
}));
