import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DiscountCode } from '@commercetools/platform-sdk';
import { useCustomer } from '../../api/hooks';
import responsiveTheme from '../../shared/ui/theme';

export default function PromoCode() {
  const [promoCode, setPromoCode] = useState<DiscountCode[]>([]);
  const { getPromoCodes } = useCustomer();
  useEffect(() => {
    getPromoCodes()
      .then((val) => setPromoCode(val.body.results))
      .catch((err: Error) => err);
  }, [getPromoCodes]);

  return (
    <Box
      sx={{
        borderRadius: '10px',
        p: 3,
        mt: 3,
        boxShadow: `0px 4px 8px ${responsiveTheme.palette.primary.main}`,
      }}
    >
      <Typography variant="h6" component="div">
        Active Promo Codes
      </Typography>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        {promoCode.map((item) => (
          <Box bgcolor="primary.main" sx={{ borderRadius: 1, color: 'white', p: 1 }}>
            {item.code}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
