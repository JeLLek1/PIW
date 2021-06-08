import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import loginReducer from './login/reducers';
import cartReducer from './cart/reducers';
export const store = configureStore({
  reducer: combineReducers({ login: loginReducer, cart: cartReducer }),
  middleware: [thunk],
});
