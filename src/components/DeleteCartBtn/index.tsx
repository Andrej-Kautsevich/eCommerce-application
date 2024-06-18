import { Button } from '@mui/material';
import { ClientResponse, ErrorObject } from '@commercetools/platform-sdk';
import { useSnackbar } from 'notistack';
import useCart from '../../api/hooks/useCart';
import { useAppSelector } from '../../shared/store/hooks';
import { SnackbarMessages } from '../../shared/types/enum';
import { ProductIDCartBtnProps } from '../../shared/types/interface';

function DeleteCartBtn({ itemID, quantity }: ProductIDCartBtnProps) {
  const { changeItemQuantity, deleteItem } = useCart();
  const cart = useAppSelector((state) => state.cart.cart);
  const { fetchCart } = useCart();
  const lessQuantity = quantity! - 1;
  const { enqueueSnackbar } = useSnackbar();

  const deleteProduct = () => async () => {
    if (cart) {
      try {
        if (quantity! > 1) {
          await changeItemQuantity(cart.version, itemID!, lessQuantity);
        } else {
          await deleteItem(cart.version, itemID!);
        }

        await fetchCart().catch((e) => {
          const error = e as ClientResponse<ErrorObject>;
          enqueueSnackbar(error.body.message, { variant: 'error' });
        });
      } catch (error) {
        enqueueSnackbar(SnackbarMessages.DELETE_ITEM_FETCH_ERROR, { variant: 'error' });
      }
    }
  };

  return (
    <Button
      variant="contained"
      onClick={deleteProduct()}
      disabled={quantity! < 1}
      sx={{ mb: 3, height: '50px', width: 200 }}
    >
      Remove from Cart
    </Button>
  );
}

export default DeleteCartBtn;
