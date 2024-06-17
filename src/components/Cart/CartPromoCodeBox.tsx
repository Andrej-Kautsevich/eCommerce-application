import { Box, Button, OutlinedInput, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CartPromoCodeBox = () => {
  const { t } = useTranslation();

  return (
    <Box component="form">
      <Typography>{t('Have a promo code? Type it here:')}</Typography>
      <Box display="flex">
        <OutlinedInput size="small" placeholder="promo code" />
        <Button sx={{ minWidth: 100, ml: 2 }} variant="contained">
          {t('Apply')}
        </Button>
      </Box>
    </Box>
  );
};

export default CartPromoCodeBox;
