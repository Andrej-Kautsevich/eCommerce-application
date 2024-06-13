import { LineItem } from '@commercetools/platform-sdk';
import { Box, CardMedia, Typography } from '@mui/material';
import { PRODUCT_IMAGE_PLACEHOLDER } from '../../shared/constants';

interface CartItemProps {
  item: LineItem;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <Box>
      <CardMedia component="img" image={item.variant.images?.at(0)?.url ?? PRODUCT_IMAGE_PLACEHOLDER.url} />
      <Typography>{item.name.en}</Typography>
    </Box>
  );
};

export default CartItem;
