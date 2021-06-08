import React, { useState } from 'react';
import selectors from 'store/selectors';
import { useSelector } from 'react-redux';
import { auth } from 'utils/firebase';
import { useDispatch } from 'react-redux';
import { emptyCart } from 'store/cart/reducers';
import { addOrder } from 'utils/firebase';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleCloseSuccess = () => {
    setIsSuccess(false);
  };

  const handleOrder = () => {
    setIsLoading(true);
    const currentOrder: IOrder[] = [];
    cart.pizzas.forEach(el => {
      currentOrder.push({
        isCustom: el.isCustom,
        name: el.name,
        customAddOns: [],
        size: el.size,
        price: el.price,
      });
      if (el.isCustom === true) {
        el.customAddOns.forEach(addOn => {
          currentOrder[currentOrder.length - 1].customAddOns.push({
            name: addOn.name,
            id: addOn.id,
          });
        });
      }
    });
    addOrder(currentOrder, user)
      .then(() => {
        dispatch(emptyCart());
        setIsSuccess(true);
        handleCartClose();
      })
      .catch(() => {
        setError('Błąd podczas przetwarzania');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
  };
};
