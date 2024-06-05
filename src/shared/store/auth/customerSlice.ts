/* eslint-disable no-param-reassign */
import { Customer } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CustomerAuthState {
  customer: Customer | undefined;
}

const initialState: CustomerAuthState = {
  customer: undefined,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    },
  },
});

export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer;
