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
    loginSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.isAnonymous = false;
    },
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
