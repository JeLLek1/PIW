import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Container,
} from '@material-ui/core';
import navLinks from './navLinks';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './style';

const Layout = ({ children }) => {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = useCallback(() => {
    setMenuOpen(oldState => !oldState);
  }, []);

  return (
    <>
      <header>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              className={
                menuOpen ? classes.menuIconOpen : classes.menuIconClosed
              }
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.menuTitle}>
              Tinder dla studentów
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={menuOpen}
          className={`${classes.drawer} ${
            menuOpen ? classes.drawerOpen : classes.drawerClose
          }`}
          classes={{
            paper: `${classes.drawer} ${
              menuOpen ? classes.drawerOpen : classes.drawerClose
            }`,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {navLinks.map(item => (
              <Tooltip
                key={item.title}
                title={item.title}
                placement="right"
                disableHoverListener={menuOpen}
              >
                <ListItem
                  button
                  component={NavLink}
                  to={item.path}
                  className={classes.navLink}
                  exact
                >
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Drawer>
      </header>
      <main
        className={`${classes.main} ${
          menuOpen ? classes.mainOpen : classes.mainClose
        }`}
      >
        <div className={classes.toolbar} />
        <Container maxWidth="lg">{children}</Container>
      </main>
    </>
  );
};

export default Layout;
