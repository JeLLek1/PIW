import { createSelector } from '@reduxjs/toolkit';

const combinerFunction = <T>(data: T) => data;
const login = (state: IStoreState) => state.login;
const cart = (state: IStoreState) => state.cart;
const getLogin = createSelector(login, combinerFunction);
const getCart = createSelector(cart, combinerFunction);
const selectors = {
  getLogin,
  getCart,
};
export default selectors;
