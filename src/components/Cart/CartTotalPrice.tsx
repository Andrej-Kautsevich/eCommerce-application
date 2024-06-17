import { Cart } from '@commercetools/platform-sdk';
import { Box, Divider, Typography } from '@mui/material';

interface CartTotalPriceProps {
  cart: Cart;
}

const CartTotalPrice = ({ cart }: CartTotalPriceProps) => {
  const { totalPrice, discountOnTotalPrice } = cart;
  const total = totalPrice.centAmount / 100;
  const totalFormatted = `$${total}`;
  let discountPriceFormatted;
  let sumPriceFormatted;

  if (discountOnTotalPrice) {
    const discountPrice = discountOnTotalPrice.discountedAmount.centAmount / 100;
    discountPriceFormatted = `$${discountPrice}`;
    const sum = discountPrice + total;
    sumPriceFormatted = `$${sum}`;
  }

  return (
    <Box display="flex" flexDirection="column">
      {discountPriceFormatted && (
        <Box>
          <Typography variant="h5" color="text.primary">
            Sum: {sumPriceFormatted}
          </Typography>
          <Typography variant="h5" mt={1} color="text.primary">
            Discount: {discountPriceFormatted}
          </Typography>
          <Divider />
        </Box>
      )}
      <Typography variant="h5" component="div" mt={1} color="text.primary">
        Total:{' '}
        <Typography variant="h4" component="span" color="text.primary">
          {totalFormatted}
        </Typography>
      </Typography>
    </Box>
  );
};

export default CartTotalPrice;
