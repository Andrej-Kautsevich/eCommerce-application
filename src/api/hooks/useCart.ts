// import { useEffect } from 'react';
import { MyCartAddLineItemAction, MyCartRemoveLineItemAction, MyCartUpdate } from '@commercetools/platform-sdk';
import useApiClient from './useApiClient';
// import useCustomer from './useCustomer';
import { Currency } from '../../shared/types/enum';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setCart } from '../../shared/store/auth/cartSlice';
// import { setCartId } from '../../shared/store/auth/cartSlice';

const useCart = () => {
  const { apiRoot } = useApiClient();
  const cartId = useAppSelector((state) => state.cart.cartId);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const response = await getCart();
  //       dispatch(setCartId(response.body.results[0].id));
  //     } catch (error) {
  //       // eslint-disable-next-line no-console
  //       console.error('Error fetching cart:', error);
  //     }
  //   };
  //   // eslint-disable-next-line no-console
  //   fetchCart().catch((error) => console.log(error));
  // }, [getCart, dispatch]);

  const getCart = () => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot.me().carts().get().execute();
  };

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

  const addItem = (cartVersion: number, productID: string = '97c20d0b-b254-46b3-b6f9-c3b39392cadf') => {
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

    return apiRoot.me().carts().withId({ ID: cartId }).post({ body: myCartAddLineItemAction }).execute();
  };

  const deleteItem = (cartVersion: number, itemId: string) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    const itemUpdateAction: MyCartRemoveLineItemAction = {
      action: 'removeLineItem',
      lineItemId: itemId,
      quantity: 1,
    };

    const myCartRemoveLineItemAction: MyCartUpdate = {
      version: cartVersion,
      actions: [itemUpdateAction],
    };

    return apiRoot.me().carts().withId({ ID: cartId }).post({ body: myCartRemoveLineItemAction }).execute();
  };

  const fetchCart = async () => {
    const carts = await getCart();

    if (carts.body.results.length === 0) {
      const newCart = await createCart();
      dispatch(setCart(newCart.body));
    } else {
      dispatch(setCart(carts.body.results[0]));
    }
  };

  return { createCart, addItem, fetchCart, deleteItem, getCart };
};
export default useCart;
