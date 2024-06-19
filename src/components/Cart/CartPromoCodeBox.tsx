import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Cart, ClientResponse, DiscountCode, ErrorObject } from '@commercetools/platform-sdk';
import { Box, Chip, Divider, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import useCart from '../../api/hooks/useCart';
import { SnackbarMessages } from '../../shared/types/enum';
import { useCustomer } from '../../api/hooks';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

type CartPromoCodeBoxProps = {
  cart: Cart;
};

const CartPromoCodeBox = ({ cart }: CartPromoCodeBoxProps) => {
  const { t } = useTranslation();
  const { addDiscountCode } = useCart();
  const { getPromoCodeById } = useCustomer();
  const [promoCode, setPromoCode] = useState('');
  const [activePromoCodes, setActivePromoCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveDiscountCodes = async () => {
      const activeDiscountCodes = await Promise.all(
        cart.discountCodes.map(async (code) => {
          const ID = code.discountCode.id;
          const response = await getPromoCodeById(ID);
          return response.body;
        }),
      );
      setActivePromoCodes(activeDiscountCodes);
    };

    try {
      fetchActiveDiscountCodes().catch(() => {
        enqueueSnackbar(SnackbarMessages.GENERAL_ERROR, { variant: 'success' });
      });
    } catch (error) {
      enqueueSnackbar(SnackbarMessages.GENERAL_ERROR, { variant: 'success' });
    }
  }, [cart.discountCodes, getPromoCodeById]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if promo code has been already applied
    if (activePromoCodes.some((code) => code.code === promoCode)) {
      enqueueSnackbar(getSnackbarMessage(SnackbarMessages.DISCOUNT_INFO, t), { variant: 'info' });
      setPromoCode(''); // clear input
      return;
    }
    try {
      setLoading(true);
      await addDiscountCode(cart.version, promoCode);
      enqueueSnackbar(getSnackbarMessage(SnackbarMessages.DISCOUNT_SUCCESS, t), { variant: 'success' });
    } catch (e) {
      const error = e as ClientResponse<ErrorObject>;
      enqueueSnackbar(error.body.message, { variant: 'error' });
    } finally {
      setLoading(false);
      setPromoCode(''); // clear input
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      {activePromoCodes && (
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
            gap: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            divider={<Divider orientation="vertical" flexItem />}
          >
            {activePromoCodes.map((code) => (
              <Chip key={code.id} label={code.name?.en ?? code.code} />
            ))}
          </Stack>
        </Paper>
      )}
      <Box component="form" onSubmit={handleSubmit} pt={1} pb={1}>
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
    </Box>
  );
};

export default CartPromoCodeBox;
