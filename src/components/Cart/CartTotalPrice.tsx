import { CentPrecisionMoney } from '@commercetools/platform-sdk';
import { Box, Typography } from '@mui/material';

interface CartTotalPriceProps {
  totalPrice: CentPrecisionMoney;
}

const CartTotalPrice = ({ totalPrice }: CartTotalPriceProps) => {
  const { centAmount } = totalPrice;
  const total = `$${centAmount / 100}`;

  return (
    <Box display="flex" justifyContent="flex-end">
      <Typography variant="h5" component="div">
        Grand total:{' '}
        <Typography variant="h4" component="span">
          {total}
        </Typography>
      </Typography>
    </Box>
  );
};

export default CartTotalPrice;
