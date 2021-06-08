import { createReducer, createAction } from '@reduxjs/toolkit';

const initialLoginState: ILoginState = {
  isLoading: true,
  user: null,
};

export const setLoginData = createAction<ILoginState>('pushNotify');
export default createReducer(initialLoginState, builder => {
  builder.addCase(setLoginData, (state, { payload }) => {
    state.isLoading = payload.isLoading;
    state.user = payload.user;
  });
});
