import { Cart } from '@commercetools/platform-sdk';
import { Box, Divider, Typography } from '@mui/material';

interface CartTotalPriceProps {
  cart: Cart;
}

const CartTotalPrice = ({ cart }: CartTotalPriceProps) => {
  const { totalPrice, discountOnTotalPrice } = cart;
  const total = `$${totalPrice.centAmount / 100}`;
  let discountAmount;
  let sum;

  if (discountOnTotalPrice) {
    discountAmount = `$${discountOnTotalPrice.discountedAmount.centAmount / 100}`;
    sum = `$${(discountOnTotalPrice.discountedAmount.centAmount + totalPrice.centAmount) / 100}`;
  }

  return (
    <Box display="flex" flexDirection="column">
      {discountAmount && (
        <Box>
          <Typography variant="h5">Sum: {sum}</Typography>
          <Typography variant="h5" mt={1}>
            Discount: {discountAmount}
          </Typography>
          <Divider />
        </Box>
      )}
      <Typography variant="h5" component="div" mt={1} color="text.primary">
        Total:{' '}
        <Typography variant="h4" component="span" color="text.primary">
          {total}
        </Typography>
      </Typography>
    </Box>
  );
};

export default CartTotalPrice;
