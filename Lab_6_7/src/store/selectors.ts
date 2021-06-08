import { createSelector } from '@reduxjs/toolkit';

const combinerFunction = <T>(data: T) => data;
const login = (state: IStoreState) => state.login;
const getLogin = createSelector(login, combinerFunction);
const selectors = {
  getLogin,
};
export default selectors;
