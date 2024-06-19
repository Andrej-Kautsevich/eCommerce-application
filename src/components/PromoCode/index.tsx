import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DiscountCode } from '@commercetools/platform-sdk';
import { useCustomer } from '../../api/hooks';
import PromoCodeBox from './promoCodeBox';

export default function PromoCode() {
  const [promoCode, setPromoCode] = useState<DiscountCode[]>([]);
  const { getPromoCodes } = useCustomer();
  useEffect(() => {
    getPromoCodes()
      .then((val) => setPromoCode(val.body.results))
      .catch((err: Error) => err);
  }, [getPromoCodes]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {promoCode.map((item) => item.isActive && <PromoCodeBox key={item.id} item={item} />)}
    </Box>
  );
}
