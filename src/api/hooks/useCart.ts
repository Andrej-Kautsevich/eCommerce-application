import {
  Cart,
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveLineItemAction,
  MyCartUpdate,
} from '@commercetools/platform-sdk';
import useApiClient from './useApiClient';
import useCustomer from './useCustomer';
import { Currency } from '../../shared/types/enum';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setCart } from '../../shared/store/auth/cartSlice';

const useCart = () => {
  const { apiRoot } = useApiClient();
  const { getCart } = useCustomer();
  const cartId = useAppSelector((state) => state.cart.cartId);
  const dispatch = useAppDispatch();

  const createCart = () => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot
      .me()
      .carts()
      .post({ body: { currency: Currency.USD } })
      .execute();
  };

  const addItem = async (cartVersion: number, productID: string) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    const itemUpdateAction: MyCartAddLineItemAction = {
      action: 'addLineItem',
      productId: productID,
    };

    const myCartAddLineItemAction: MyCartUpdate = {
      version: cartVersion,
      actions: [itemUpdateAction],
    };

    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: myCartAddLineItemAction })
      .execute();

    dispatch(setCart(response.body));
  };

  const deleteItem = async (cartVersion: number, itemId: string) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    const itemUpdateAction: MyCartRemoveLineItemAction = {
      action: 'removeLineItem',
      lineItemId: itemId,
    };

    const myCartRemoveLineItemAction: MyCartUpdate = {
      version: cartVersion,
      actions: [itemUpdateAction],
    };

    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: myCartRemoveLineItemAction })
      .execute();

    dispatch(setCart(response.body));
  };

  const deleteAllItems = async (cart: Cart) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    const itemUpdateActions = cart.lineItems.map((item) => {
      const itemUpdateAction: MyCartRemoveLineItemAction = {
        action: 'removeLineItem',
        lineItemId: item.id,
      };
      return itemUpdateAction;
    });

    const myCartRemoveLineItemAction: MyCartUpdate = {
      version: cart.version,
      actions: itemUpdateActions,
    };

    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: myCartRemoveLineItemAction })
      .execute();
    dispatch(setCart(response.body));
  };

  const changeItemQuantity = async (cartVersion: number, itemId: string, quantity: number) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    const action: MyCartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      lineItemId: itemId,
      quantity,
    };

    const myCartChangeLineItemQuantityAction: MyCartUpdate = {
      version: cartVersion,
      actions: [action],
    };

    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: myCartChangeLineItemQuantityAction })
      .execute();

    dispatch(setCart(response.body));
  };

  const addDiscountCode = async (cartVersion: number, discountCode: string) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    const action: MyCartAddDiscountCodeAction = {
      action: 'addDiscountCode',
      code: discountCode,
    };

    const myCartAddDiscountCodeAction: MyCartUpdate = {
      version: cartVersion,
      actions: [action],
    };

    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: myCartAddDiscountCodeAction })
      .execute();

    dispatch(setCart(response.body));
  };

  const fetchCart = async () => {
    const response = await getCart();
    const cart = response.body.results[0];

    if (!cart) {
      const newCart = (await createCart()).body;
      dispatch(setCart(newCart));
    } else {
      dispatch(setCart(cart));
    }
  };

  return { createCart, addItem, fetchCart, deleteItem, deleteAllItems, changeItemQuantity, addDiscountCode };
};
export default useCart;
