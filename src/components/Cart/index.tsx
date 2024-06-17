import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useCustomer } from '../../api/hooks';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setTotalProducts, setProductList } from '../../shared/store/auth/cartSlice';
import useCart from '../../api/hooks/useCart';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

const Cart = () => {
  const { t } = useTranslation();
  const { getCart } = useCustomer();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const productList = useAppSelector((state) => state.cart.productList);
  const [initialFetch, setInitialFetch] = useState(true);
  const { deleteItem } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        dispatch(setTotalProducts(response.body.results[0].totalLineItemQuantity));

        const itemList = response.body.results[0].lineItems.map((item) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
        }));

        dispatch(setProductList(itemList));
      } catch (error) {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.CART_FETCH_ERROR, t), { variant: 'error' });
      }
    };

    if (initialFetch) {
      fetchCart().catch(() =>
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.CART_FETCH_ERROR, t), { variant: 'error' }),
      );
      setInitialFetch(false);
    }
  }, [getCart, dispatch, initialFetch, enqueueSnackbar, t]);

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
      fetchAddItem().catch(() =>
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.ADD_ITEM_FETCH_ERROR, t), { variant: 'error' }),
      );
    } catch (error) {
      enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' });
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
