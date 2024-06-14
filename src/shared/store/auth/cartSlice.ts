/* eslint-disable no-param-reassign */
import { Cart } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  cart: Cart | undefined;
  cartId: string;
  cartTotalProducts: number | undefined;
  productList: Product[];
}

const initialState: CartState = {
  cart: undefined,
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
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.cartId = action.payload.id;
    },
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

export const { setCart, setCartId, setTotalProducts, setProductList } = cartSlice.actions;

export default cartSlice.reducer;
