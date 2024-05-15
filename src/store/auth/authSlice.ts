/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface CustomerAuthState {
  loading: boolean;
  isLoggedIn: boolean;
  isAnonymous: boolean;
}

const initialState: CustomerAuthState = {
  loading: false,
  isLoggedIn: false,
  isAnonymous: true,
};

const authSlice = createSlice({
  name: 'customerAuth',
  initialState,
  reducers: {
    loginFetch: (state) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.isAnonymous = false;
    },
    loginError: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.isAnonymous = true;
    },
  },
});

export const { loginFetch, loginSuccess, loginError } = authSlice.actions;

export default authSlice.reducer;
