/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  cartId: string;
  cartTotalProducts: number | undefined;
  productList: Product[];
  currencyProductCount: number;
  currencyItemCartId: string;
}

const initialState: CartState = {
  cartId: '',
  cartTotalProducts: undefined,
  productList: [],
  currencyProductCount: 0,
  currencyItemCartId: '',
};

interface Product {
  id: string;
  productId: string;
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
    setCurrencyProductCount: (state, action: PayloadAction<number>) => {
      state.currencyProductCount = action.payload;
    },
    setCurrencyItemCartId: (state, action: PayloadAction<string>) => {
      state.currencyItemCartId = action.payload;
    },
  },
});

export const { setCartId, setTotalProducts, setProductList, setCurrencyProductCount, setCurrencyItemCartId } =
  cartSlice.actions;

export default cartSlice.reducer;
