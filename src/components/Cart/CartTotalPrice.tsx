import { CentPrecisionMoney } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';

interface CartTotalPriceProps {
  totalPrice: CentPrecisionMoney;
}

const CartTotalPrice = ({ totalPrice }: CartTotalPriceProps) => {
  const { centAmount } = totalPrice;
  const total = `$${centAmount / 100}`;

  return (
    <Typography variant="h5" component="div">
      Total:{' '}
      <Typography variant="h4" component="span">
        {total}
      </Typography>
    </Typography>
  );
};

export default CartTotalPrice;
