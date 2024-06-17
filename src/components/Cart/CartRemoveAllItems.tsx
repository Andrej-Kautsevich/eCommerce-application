import { Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useAppSelector } from '../../shared/store/hooks';
import useCart from '../../api/hooks/useCart';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';
import { SnackbarMessages } from '../../shared/types/enum';

const CartRemoveAllItems = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { cart } = useAppSelector((state) => state.cart);
  const { deleteAllItems } = useCart();

  const handleDeleteItems = async () => {
    if (cart) {
      try {
        setLoading(true);
        await deleteAllItems(cart);
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.REMOVE_ITEM_SUCCESS, t), { variant: 'success' });
        setLoading(false);
      } catch (error) {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.DELETE_ITEM_FETCH_ERROR, t), { variant: 'error' });
        setLoading(false);
      }
    }
  };

  return (
    <LoadingButton
      variant="outlined"
      loading={loading}
      endIcon={<Delete />}
      loadingPosition="end"
      onClick={handleDeleteItems}
    >
      <span>{t('Remove all')}</span>
    </LoadingButton>
  );
};

export default CartRemoveAllItems;
