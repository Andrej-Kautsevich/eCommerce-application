/* eslint-disable no-param-reassign */
import { AuthErrorResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CustomerAuthState {
  loading: boolean;
  isLoggedIn: boolean;
  isAnonymous: boolean;
  loginError: string | undefined;
}

const initialState: CustomerAuthState = {
  loading: false,
  isLoggedIn: false,
  isAnonymous: true,
  loginError: undefined,
};

const authSlice = createSlice({
  name: 'customerAuth',
  initialState,
  reducers: {
    loginFetch: (state) => {
      state.loading = true;
      state.loginError = undefined;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.isAnonymous = false;
    },
    loginError: (state, action: PayloadAction<AuthErrorResponse>) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.isAnonymous = true;
      state.loginError = action.payload.message;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginFetch, loginSuccess, loginError, logout } = authSlice.actions;

export default authSlice.reducer;
