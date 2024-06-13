/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  cartId: string;
  cartTotalProducts: number | undefined;
  productList: Product[];
}

const initialState: CartState = {
  cartId: '',
  cartTotalProducts: undefined,
  productList: [],
};

interface Product {
  id: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },
    setTotalProducts: (state, action: PayloadAction<number | undefined>) => {
      state.cartTotalProducts = action.payload;
    },
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload;
    },
  },
});

export const { setCartId, setTotalProducts, setProductList } = cartSlice.actions;

export default cartSlice.reducer;
