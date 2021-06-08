import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import loginReducer from './login/reducers';
export const store = configureStore({
  reducer: combineReducers({ login: loginReducer }),
  middleware: [thunk],
});
