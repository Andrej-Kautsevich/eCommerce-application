import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DiscountCode } from '@commercetools/platform-sdk';
import { enqueueSnackbar } from 'notistack';
import { useCustomer } from '../../api/hooks';
import PromoCodeBox from './promoCodeBox';
import { SnackbarMessages } from '../../shared/types/enum';

export default function PromoCode() {
  const [promoCode, setPromoCode] = useState<DiscountCode[]>([]);
  const { getPromoCodes } = useCustomer();
  useEffect(() => {
    const fetchPromoCodes = async () => {
      const res = await getPromoCodes();
      setPromoCode(res.body.results);
    };

    try {
      fetchPromoCodes().catch(() => enqueueSnackbar(SnackbarMessages.GENERAL_ERROR, { variant: 'error' }));
    } catch (error) {
      enqueueSnackbar(SnackbarMessages.GENERAL_ERROR, { variant: 'error' });
    }
  }, [getPromoCodes]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {promoCode.map((item) => item.isActive && <PromoCodeBox key={item.id} item={item} />)}
    </Box>
  );
}
