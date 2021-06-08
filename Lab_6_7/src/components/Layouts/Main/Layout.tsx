import React from 'react';
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Link,
  Typography,
} from '@material-ui/core';
import { ReactComponent as LogoSVG } from 'assets/img/pizza.svg';
import { useLayout } from './utils';
import { useStyles } from './style';
import { Link as RouterLink } from 'react-router-dom';

const Layout: React.FunctionComponent = ({ children }) => {
  const {
    anchorEl,
    menuId,
    isMenuOpen,
    user,
    handleMenuOpen,
    handleMenuClose,
    handleLogOut,
  } = useLayout();
  const classes = useStyles();
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
      <MenuItem
        onClick={ev => {
          handleMenuClose(ev);
          handleLogOut();
        }}
      >
        Wyloguj
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <header>
        <AppBar position="fixed">
          <Toolbar>
            <Link component={RouterLink} to="/" className={classes.logoWrapper}>
              <LogoSVG className={classes.logo} />
              <Typography
                variant="h3"
                color="secondary"
                className={classes.logoTitle}
              >
                Student Pizza
              </Typography>
            </Link>
            <div>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <Avatar className={classes.userLogo}>
                  {user.email.substring(0, 2)}
                </Avatar>
              </IconButton>
              {renderMenu}
            </div>
          </Toolbar>
        </AppBar>
      </header>
      <main className={classes.main}>{children}</main>
    </>
  );
};
export default Layout;
