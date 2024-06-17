import { useLocation } from 'react-router-dom';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useCustomer } from '../../api/hooks';
import useCart from '../../api/hooks/useCart';
import { useAppDispatch } from '../../shared/store/hooks';
import { setCurrencyProductCount, setProductList, setTotalProducts } from '../../shared/store/auth/cartSlice';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

export default function AddCartBtn() {
  const { t } = useTranslation();
  const { getCart } = useCustomer();
  const { addItem } = useCart();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const productID = useLocation().pathname.split('/').slice(2).join();

  const addProduct = (productId: string) => async () => {
    try {
      const response = await getCart();
      const fetchAddItem = async () => {
        await addItem(response.body.results[0].version, productId);
        const updatedCart = await getCart();
        dispatch(setTotalProducts(updatedCart.body.results[0].totalLineItemQuantity));

        const itemList = updatedCart.body.results[0].lineItems.map((item) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
        }));
        dispatch(setProductList(itemList));
        for (let i = 0; i < itemList.length; i += 1) {
          if (itemList[i].productId === productID) {
            dispatch(setCurrencyProductCount(itemList[i].quantity));
          }
        }
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.ADD_ITEM_SUCCESS, t), { variant: 'success' });
      };
      fetchAddItem().catch(() => {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.ADD_ITEM_FETCH_ERROR, t), { variant: 'error' });
      });
    } catch (error) {
      enqueueSnackbar(getSnackbarMessage(SnackbarMessages.ADD_ITEM_FETCH_ERROR, t), { variant: 'error' });
    }
  };

  return (
    <Button variant="contained" onClick={addProduct(productID)} sx={{ mb: 3, height: '50px', width: 200 }}>
      {t('Add to Cart')}
      <ShoppingCartOutlined fontSize="large" sx={{ color: 'primary.contrastText', ml: 1 }} />
    </Button>
  );
}
