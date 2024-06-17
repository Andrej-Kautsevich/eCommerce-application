import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../shared/store/hooks';
import useCart from '../../api/hooks/useCart';

const CartRemoveAllItems = () => {
  const { t } = useTranslation();
  const { cart } = useAppSelector((state) => state.cart);
  const { deleteAllItems } = useCart();

  const handleDeleteItems = () => {
    if (cart) {
      // eslint-disable-next-line no-console
      deleteAllItems(cart).catch((error) => console.log(error));
    }
  };

  return (
    <Button variant="outlined" endIcon={<Delete />} onClick={handleDeleteItems}>
      {t('Remove all')}
    </Button>
  );
};

export default CartRemoveAllItems;
