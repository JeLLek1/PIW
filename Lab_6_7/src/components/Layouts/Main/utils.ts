import React, { useState } from 'react';
import selectors from 'store/selectors';
import { useSelector } from 'react-redux';
import { auth } from 'utils/firebase';
import { useDispatch } from 'react-redux';
import { emptyCart } from 'store/cart/reducers';

export const useLayout = () => {
  const dispatch = useDispatch();
  const menuId = 'account-menu';
  const cartId = 'cart-menu';
  const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const [cartAnchorEl, setCartAnchorEl] = useState<Element | null>(null);
  const isCartOpen = Boolean(cartAnchorEl);
  const { user } = useSelector(selectors.getLogin);
  const cart = useSelector(selectors.getCart);

  const handleMenuOpen = (event: React.MouseEvent<Element, MouseEvent>) => {
    setMenuAnchorEl(event.currentTarget as Element);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCartOpen = (event: React.MouseEvent<Element, MouseEvent>) => {
    setCartAnchorEl(event.currentTarget as Element);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const handleLogOut = () => {
    auth.signOut();
    dispatch(emptyCart());
  };

  return {
    menuAnchorEl,
    menuId,
    isMenuOpen,
    user,
    cart,
    isCartOpen,
    cartAnchorEl,
    cartId,
    handleMenuOpen,
    handleMenuClose,
    handleLogOut,
    handleCartOpen,
    handleCartClose,
  };
};
