import { ShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import useCart from '../../api/hooks/useCart';
import { useAppSelector } from '../../shared/store/hooks';
import { ProductIDCartBtnProps } from '../../shared/types/interface';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

function AddCartBtn({ productID }: ProductIDCartBtnProps) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const cart = useAppSelector((state) => state.cart.cart);
  const { fetchCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const addProduct = () => async () => {
    if (cart) {
      try {
        await addItem(cart.version, productID!);
        await fetchCart();
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.ADD_ITEM_SUCCESS, t), { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.ADD_ITEM_FETCH_ERROR, t), { variant: 'error' });
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 1 }}>
      <Button variant="contained" onClick={addProduct()} sx={{ height: '50px', width: 200 }}>
        {t('Add to Cart')}
        <ShoppingCartOutlined fontSize="large" sx={{ color: 'primary.contrastText', ml: 1 }} />
      </Button>
    </Box>
  );
}

export default AddCartBtn;
