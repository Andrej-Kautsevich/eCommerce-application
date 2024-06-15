/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart as ApiCart } from '@commercetools/platform-sdk';

interface CartState {
  cart: ApiCart;
  cartId: string;
  cartTotalProducts: number | undefined;
  productList: Product[];
  currencyProductCount: number;
  currencyItemCartId: string;
  cartUpdate: CartUpdate;
}

const initialState: CartState = {
  cart: {
    id: '',
    version: 0,
    createdAt: '',
    lastModifiedAt: '',
    lastModifiedBy: {},
    createdBy: {},
    lineItems: [],
    cartState: '',
    totalPrice: {
      type: 'centPrecision',
      centAmount: 0,
      currencyCode: '',
      fractionDigits: 0,
    },
    shippingMode: '',
    shipping: [],
    customLineItems: [],
    discountCodes: [],
    directDiscounts: [],
    inventoryMode: '',
    taxMode: '',
    taxRoundingMode: '',
    taxCalculationMode: '',
    refusedGifts: [],
    origin: '',
    itemShippingAddresses: [],
  },
  cartId: '',
  cartTotalProducts: undefined,
  productList: [],
  currencyProductCount: 0,
  currencyItemCartId: '',
  cartUpdate: { status: false },
};

interface Product {
  id: string;
  productId: string;
  quantity: number;
}

type CartUpdate = {
  status: boolean;
  message?: string;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ApiCart>) => {
      state.cart = action.payload;
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
    setCurrencyProductCount: (state, action: PayloadAction<number>) => {
      state.currencyProductCount = action.payload;
    },
    setCurrencyItemCartId: (state, action: PayloadAction<string>) => {
      state.currencyItemCartId = action.payload;
    },
    setCartUpdate: (state, action: PayloadAction<CartUpdate>) => {
      state.cartUpdate = action.payload;
    },
  },
});

export const {
  setCart,
  setCartId,
  setTotalProducts,
  setProductList,
  setCurrencyProductCount,
  setCurrencyItemCartId,
  setCartUpdate,
} = cartSlice.actions;

export default cartSlice.reducer;
