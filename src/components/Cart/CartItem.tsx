import { LineItem } from '@commercetools/platform-sdk';
import { Box, CardMedia, Typography } from '@mui/material';
import { PRODUCT_IMAGE_PLACEHOLDER } from '../../shared/constants';
import emptyImage from '../../shared/assets/images/empty-img.png';
import { cartItemMediaSx, cartItemSx } from './CartItemStyles';

interface CartItemProps {
  item: LineItem;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <Box sx={cartItemSx}>
      <CardMedia
        sx={cartItemMediaSx}
        component="img"
        image={item.variant.images?.at(0)?.url ?? PRODUCT_IMAGE_PLACEHOLDER.url}
        alt={item.name.en}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = emptyImage;
        }}
      />
      <Typography>{item.name.en}</Typography>
    </Box>
  );
};

export default CartItem;
