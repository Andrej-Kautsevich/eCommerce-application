import { Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useAppSelector } from '../../shared/store/hooks';
import useCart from '../../api/hooks/useCart';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';
import { SnackbarMessages } from '../../shared/types/enum';
import CartConfirmationDialog from './CartConfirmationDialog';

const CartRemoveAllItems = () => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  const { cart } = useAppSelector((state) => state.cart);
  const { deleteAllItems } = useCart();

  const handleDeleteItems = async () => {
    if (cart) {
      try {
        setLoading(true);
        await deleteAllItems(cart);
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.REMOVE_ITEM_SUCCESS, t), { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.DELETE_ITEM_FETCH_ERROR, t), { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <LoadingButton
        variant="outlined"
        loading={loading}
        endIcon={<Delete />}
        loadingPosition="end"
        onClick={() => setDialogOpen(true)}
      >
        <span>{t('Remove all')}</span>
      </LoadingButton>
      <CartConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)} // Close the dialog
        onConfirm={handleDeleteItems} // Proceed with clearing the cart
      />
    </>
  );
};

export default CartRemoveAllItems;
