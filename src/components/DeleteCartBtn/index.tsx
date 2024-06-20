import { useState } from 'react';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import useCart from '../../api/hooks/useCart';
import { useAppSelector } from '../../shared/store/hooks';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';
import { ProductIDCartBtnProps } from '../../shared/types/interface';

function DeleteCartBtn({ itemID, quantity }: ProductIDCartBtnProps) {
  const { t } = useTranslation();
  const { changeItemQuantity, deleteItem } = useCart();
  const cart = useAppSelector((state) => state.cart.cart);
  const { fetchCart } = useCart();
  const lessQuantity = quantity! - 1;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const deleteProduct = () => async () => {
    if (cart) {
      try {
        setLoading(true);
        if (quantity! > 1) {
          await changeItemQuantity(cart.version, itemID!, lessQuantity);
        } else {
          await deleteItem(cart.version, itemID!);
        }
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.REMOVE_ITEM_SUCCESS, t), { variant: 'success' });

        await fetchCart();
      } catch (error) {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.DELETE_ITEM_FETCH_ERROR, t), { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={deleteProduct()}
      disabled={quantity! < 1}
      sx={{ mb: 3, height: '50px', width: 200 }}
    >
      <span>{t('Remove from Cart')}</span>
    </LoadingButton>
  );
}

export default DeleteCartBtn;
