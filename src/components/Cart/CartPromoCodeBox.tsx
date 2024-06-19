import { ChangeEvent, FormEvent, useState } from 'react';
import { Cart, ClientResponse, ErrorObject } from '@commercetools/platform-sdk';
import { Box, OutlinedInput, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import useCart from '../../api/hooks/useCart';
import { SnackbarMessages } from '../../shared/types/enum';

type CartPromoCodeBoxProps = {
  cart: Cart;
};

const CartPromoCodeBox = ({ cart }: CartPromoCodeBoxProps) => {
  const { t } = useTranslation();
  const { addDiscountCode } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      await addDiscountCode(cart.version, promoCode);
      enqueueSnackbar(SnackbarMessages.DISCOUNT_SUCCESS, { variant: 'success' });
    } catch (e) {
      const error = e as ClientResponse<ErrorObject>;
      enqueueSnackbar(error.body.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography color="text.primary">{t('Have a promo code? Type it here:')}</Typography>
      <Box display="flex">
        <OutlinedInput size="small" placeholder="promo code" value={promoCode} onChange={handleChange} />
        <LoadingButton
          loading={loading}
          type="submit"
          disabled={!promoCode}
          sx={{ minWidth: 100, ml: 2 }}
          loadingIndicator={t('Loading…')}
          variant="contained"
        >
          <span>{t('Apply')}</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CartPromoCodeBox;
