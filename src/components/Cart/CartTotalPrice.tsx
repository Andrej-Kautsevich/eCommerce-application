import { CentPrecisionMoney } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';

interface CartTotalPriceProps {
  totalPrice: CentPrecisionMoney;
}

const CartTotalPrice = ({ totalPrice }: CartTotalPriceProps) => {
  const { centAmount } = totalPrice;
  const total = `$${centAmount / 100}`;

  return (
    <Typography variant="h5" component="div" color="text.primary">
      Total:{' '}
      <Typography variant="h4" component="span" color="text.primary">
        {total}
      </Typography>
    </Typography>
  );
};

export default CartTotalPrice;
