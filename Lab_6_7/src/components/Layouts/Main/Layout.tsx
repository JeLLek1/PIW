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
  Badge,
  Button,
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { ReactComponent as LogoSVG } from 'assets/img/pizza.svg';
import { useLayout } from './utils';
import { useStyles } from './style';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartItem from 'components/CartItem';
import Alert from '@material-ui/lab/Alert';

const Layout: React.FunctionComponent = ({ children }) => {
  const {
    menuAnchorEl,
    menuId,
    isMenuOpen,
    user,
    cart,
    isCartOpen,
    cartAnchorEl,
    cartId,
    isLoading,
    error,
    isSuccess,
    handleMenuOpen,
    handleMenuClose,
    handleLogOut,
    handleCartOpen,
    handleCartClose,
    handleOrder,
    handleCloseSuccess,
  } = useLayout();
  const classes = useStyles();
  const renderMenu = (
    <Menu
      anchorEl={menuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Zamówienia</MenuItem>
      <MenuItem
        onClick={ev => {
          handleMenuClose();
          handleLogOut();
        }}
      >
        Wyloguj
      </MenuItem>
    </Menu>
  );
  const renderCart = (
    <Menu
      anchorEl={cartAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={cartId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isCartOpen}
      onClose={handleCartClose}
    >
      {cart.count > 0 ? (
        <>
          {error && (
            <Alert severity="error" style={{ margin: '1rem 0' }}>
              {error}
            </Alert>
          )}
          {cart.pizzas.map(el => (
            <CartItem key={el.key} itemData={el} />
          ))}

          <div className={classes.spaceCartItem}>
            <Typography className={classes.textSum}>
              Suma: {cart.price.toFixed(2)}zł
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={isLoading && <CircularProgress size={20} />}
              onClick={handleOrder}
            >
              Zamiawiam
            </Button>
          </div>
        </>
      ) : (
        <Typography className={classes.spaceCartItem}>
          Koszyk jest pusty :c
        </Typography>
      )}
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
              <IconButton aria-label="Koszyk" onClick={handleCartOpen}>
                <Badge badgeContent={cart.count} color="secondary">
                  <ShoppingCartIcon htmlColor="#ffffff" />
                </Badge>
              </IconButton>
              {renderCart}
            </div>
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
      <Dialog open={isSuccess} onClose={handleCloseSuccess}>
        <DialogTitle>Zamówienie zostało złożone</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Możesz przejść do informacji o złożonych zamówieniach klikając na
            logo swojego profilu, a następnie na "Zamówienia"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Layout;
