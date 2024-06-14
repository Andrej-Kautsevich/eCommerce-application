import { Box, Button, OutlinedInput, Typography } from '@mui/material';

const CartPromoCode = () => {
  return (
    <Box component="form">
      <Typography>Have a promo code? Type it here:</Typography>
      <Box display="flex">
        <OutlinedInput size="small" placeholder="promo code" />
        <Button sx={{ minWidth: 100, ml: 2 }} variant="contained">
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default CartPromoCode;
