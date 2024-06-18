import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '../../shared/store/hooks';
import useCart from '../../api/hooks/useCart';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';
import { SnackbarMessages } from '../../shared/types/enum';

const CartRemoveAllItems = () => {
  const { t } = useTranslation();
  const { cart } = useAppSelector((state) => state.cart);
  const { deleteAllItems } = useCart();

  const handleDeleteItems = () => {
    if (cart) {
      deleteAllItems(cart).catch(() =>
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.DELETE_ITEM_FETCH_ERROR, t), { variant: 'error' }),
      );
    }
  };

  return (
    <Button variant="outlined" endIcon={<Delete />} onClick={handleDeleteItems}>
      {t('Remove all')}
    </Button>
  );
};

export default CartRemoveAllItems;
