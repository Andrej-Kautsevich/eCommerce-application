import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SnackbarState {
  snackbarMessages: SnackbarMessage[];
}

export type SnackbarMessage = {
  severity: 'success' | 'info' | 'warning' | 'error';
  message: string;
  title?: string;
};

const initialState: SnackbarState = {
  snackbarMessages: [],
};

const authSlice = createSlice({
  name: 'snackbarSlice',
  initialState,
  reducers: {
    addSnackbarMessage: (state, action: PayloadAction<SnackbarMessage>) => {
      state.snackbarMessages.push(action.payload);
    },
  },
});

export const { addSnackbarMessage } = authSlice.actions;

export default authSlice.reducer;
