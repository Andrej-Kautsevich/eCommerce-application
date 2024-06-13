import { LineItem } from '@commercetools/platform-sdk';
import { Box, CardMedia, Typography } from '@mui/material';
import emptyImage from '../../shared/assets/images/empty-img.png';
import { cartItemInfo, cartItemMediaSx, cartItemSx } from './CartItemStyles';
import parseLineItem from '../../shared/utils/parseCartLineItem';
import { ITEM_HEIGHT_XS } from './constants';
import LinkRouter from '../CatalogBreadcrumbs/LinkRouter';
import { RoutePaths } from '../../shared/types/enum';

interface CartItemProps {
  item: LineItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const parsedItem = parseLineItem(item);

  const { images, name, productId, prices } = parsedItem;
  const productLink = `${RoutePaths.PRODUCT}/${productId}`;

  return (
    <Box sx={cartItemSx} height={{ xs: ITEM_HEIGHT_XS }}>
      <LinkRouter to={productLink}>
        <CardMedia
          sx={cartItemMediaSx}
          component="img"
          image={images[0].url}
          alt={name}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = emptyImage;
          }}
        />
      </LinkRouter>
      <Box width="100%" display="flex" flexDirection="column">
        <Box sx={cartItemInfo}>
          <Typography variant="body1" component="div">
            {name}
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            {`Article: ${productId}`}
          </Typography>
          <Box display="flex">
            {prices.discountPrice && (
              <Typography variant="body1" component="div" color="error.light" mr={1}>
                {prices.discountPrice}
              </Typography>
            )}
            <Typography
              variant={prices.discountPrice ? 'caption' : 'body1'}
              component="div"
              sx={prices.discountPrice ? { textDecoration: 'line-through' } : null}
            >
              {prices.price}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" component="div">
            {prices.totalPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
