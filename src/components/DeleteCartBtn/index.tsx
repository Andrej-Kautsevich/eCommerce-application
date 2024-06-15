import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { ClientResponse, ErrorObject } from '@commercetools/platform-sdk';
import { useSnackbar } from 'notistack';
import { useCustomer } from '../../api/hooks';
import useCart from '../../api/hooks/useCart';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setCartUpdate, setCurrencyProductCount } from '../../shared/store/auth/cartSlice';
import { ErrorMessages, Status } from '../../shared/types/enum';

const DeleteCartBtn = () => {
  const { getCart } = useCustomer();
  const { deleteItem } = useCart();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const productID = useLocation().pathname.split('/').slice(2).join();
  const currencyItemCartId = useAppSelector((state) => state.cart.currencyItemCartId);
  const currencyProductCount = useAppSelector((state) => state.cart.currencyProductCount);

  const deleteProduct = (itemCartId: string) => async () => {
    try {
      const response = await getCart();

      const fetchDeleteItem = async () => {
        await deleteItem(response.body.results[0].version, itemCartId);

        const updatedCart = await getCart();

        const itemList = updatedCart.body.results[0].lineItems.map((item) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
        }));

        for (let i = 0; i < itemList.length; i += 1) {
          if (itemList[i].productId === productID) {
            dispatch(setCurrencyProductCount(itemList[i].quantity));
          } else {
            dispatch(setCurrencyProductCount(0));
          }
        }
        dispatch(setCartUpdate({ status: true, message: Status.Remove }));
      };

      fetchDeleteItem().catch((e) => {
        const error = e as ClientResponse<ErrorObject>;
        enqueueSnackbar(error.body.message, { variant: 'error' });
      });
    } catch (error) {
      enqueueSnackbar(ErrorMessages.DELETE_ITEM_FETCH, { variant: 'error' });
    }
  };

  return (
    <Button
      variant="contained"
      onClick={deleteProduct(currencyItemCartId)}
      sx={{ mb: 3, height: '50px', width: 200 }}
      disabled={currencyProductCount === 0}
    >
      Remove from Cart
    </Button>
  );
};

export default DeleteCartBtn;
