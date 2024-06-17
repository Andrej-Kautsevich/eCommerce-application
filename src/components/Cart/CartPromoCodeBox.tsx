import { ChangeEvent, FormEvent, useState } from 'react';
import { Cart, ClientResponse, ErrorObject } from '@commercetools/platform-sdk';
import { Box, Button, OutlinedInput, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import useCart from '../../api/hooks/useCart';
import { SnackbarMessages } from '../../shared/types/enum';

type CartPromoCodeBoxProps = {
  cart: Cart;
};

const CartPromoCodeBox = ({ cart }: CartPromoCodeBoxProps) => {
  const { addDiscountCode } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addDiscountCode(cart.version, promoCode);
      enqueueSnackbar(SnackbarMessages.DISCOUNT_SUCCESS, { variant: 'success' });
    } catch (e) {
      const error = e as ClientResponse<ErrorObject>;
      enqueueSnackbar(error.body.message, { variant: 'error' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography>Have a promo code? Type it here:</Typography>
      <Box display="flex">
        <OutlinedInput size="small" placeholder="promo code" value={promoCode} onChange={handleChange} />
        <Button type="submit" disabled={!promoCode} sx={{ minWidth: 100, ml: 2 }} variant="contained">
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default CartPromoCodeBox;
