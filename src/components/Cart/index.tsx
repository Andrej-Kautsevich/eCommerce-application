import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useCustomer } from '../../api/hooks';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setTotalProducts, setProductList } from '../../shared/store/auth/cartSlice';
import useCart from '../../api/hooks/useCart';

const Cart = () => {
  const { getCart } = useCustomer();
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state) => state.cart.productList);
  const [initialFetch, setInitialFetch] = useState(true);
  const { deleteItem } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        // eslint-disable-next-line no-console
        console.log(response.body.results[0]);
        dispatch(setTotalProducts(response.body.results[0].totalLineItemQuantity));

        const itemList = response.body.results[0].lineItems.map((item) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
        }));

        dispatch(setProductList(itemList));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching cart:', error);
      }
    };

    if (initialFetch) {
      // eslint-disable-next-line no-console
      fetchCart().catch((error) => console.log(error));
      setInitialFetch(false);
    }
  }, [getCart, dispatch, initialFetch]);

  const deleteProduct = (itemId: string) => async () => {
    try {
      const response = await getCart();
      const fetchAddItem = async () => {
        await deleteItem(response.body.results[0].version, itemId);
        const updatedCart = await getCart();
        dispatch(setTotalProducts(updatedCart.body.results[0].totalLineItemQuantity));

        const itemList = updatedCart.body.results[0].lineItems.map((item) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
        }));
        dispatch(setProductList(itemList));
      };
      // eslint-disable-next-line no-console
      fetchAddItem().catch((error) => console.log(error));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Box>
      {productList.map((product) => (
        <Typography key={product.id} sx={{ mb: 1 }}>
          {product.id}: {product.quantity}
          <Button variant="contained" sx={{ ml: 2 }} onClick={deleteProduct(product.id)}>
            delete
          </Button>
        </Typography>
      ))}
    </Box>
  );
};

export default Cart;
