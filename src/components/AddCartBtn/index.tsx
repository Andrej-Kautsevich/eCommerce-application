import { ShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { ClientResponse, ErrorObject } from '@commercetools/platform-sdk';
import { useSnackbar } from 'notistack';
import useCart from '../../api/hooks/useCart';
import { useAppSelector } from '../../shared/store/hooks';
import { ProductIDCartBtnProps } from '../../shared/types/interface';
import { SnackbarMessages } from '../../shared/types/enum';

function AddCartBtn({ productID }: ProductIDCartBtnProps) {
  const { addItem } = useCart();
  const cart = useAppSelector((state) => state.cart.cart);
  const { fetchCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const addProduct = () => async () => {
    if (cart) {
      try {
        await addItem(cart.version, productID!).catch((e) => {
          const error = e as ClientResponse<ErrorObject>;
          enqueueSnackbar(error.body.message, { variant: 'error' });
        });
        await fetchCart();
        enqueueSnackbar(SnackbarMessages.ADD_ITEM_SUCCESS, { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(SnackbarMessages.ADD_ITEM_FETCH_ERROR, { variant: 'error' });
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 3 }}>
      <Button variant="contained" onClick={addProduct()} sx={{ height: '50px', width: 200 }}>
        Add to Cart
        <ShoppingCartOutlined fontSize="large" sx={{ color: 'primary.contrastText', ml: 1 }} />
      </Button>
    </Box>
  );
}

export default AddCartBtn;
