/* eslint-disable no-param-reassign */
import { AuthErrorResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CustomerAuthState {
  loading: boolean;
  isLoggedIn: boolean;
  loginError: string | undefined;
  submitSuccess: SubmitSuccess;
}

type SubmitSuccess = {
  status: boolean;
  message?: string;
};

const initialState: CustomerAuthState = {
  loading: false,
  isLoggedIn: false,
  loginError: undefined,
  submitSuccess: { status: false },
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
    },
    loginError: (state, action: PayloadAction<AuthErrorResponse>) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.loginError = action.payload.message;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setSubmitSuccess: (state, action: PayloadAction<SubmitSuccess>) => {
      state.submitSuccess.status = action.payload.status;
      state.submitSuccess.message = action.payload.message;
    },
  },
});

export const { loginFetch, loginSuccess, loginError, logout, setSubmitSuccess } = authSlice.actions;

export default authSlice.reducer;
