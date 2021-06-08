import React, { useState } from 'react';
import selectors from 'store/selectors';
import { useSelector } from 'react-redux';
import { auth } from 'utils/firebase';

export const useLayout = () => {
  const menuId = 'account-menu';
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { user } = useSelector(selectors.getLogin);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<Element, MouseEvent>) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const handleMenuClose = (event: React.MouseEvent<Element, MouseEvent>) => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    auth.signOut();
  };

  return {
    anchorEl,
    menuId,
    isMenuOpen,
    user,
    handleMenuOpen,
    handleMenuClose,
    handleLogOut,
  };
};
