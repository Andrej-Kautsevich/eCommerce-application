import { LineItem } from '@commercetools/platform-sdk';
import { Box, CardMedia, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import emptyImage from '../../../../shared/assets/images/empty-img.png';
import { cartItemInfoSx, cartItemMediaSx, cartItemRemoveSx, cartItemSx } from './CartItemStyles';
import parseLineItem from '../../../../shared/utils/parseCartLineItem';
import { ITEM_HEIGHT_XS } from '../../constants';
import LinkRouter from '../../../CatalogBreadcrumbs/LinkRouter';
import { RoutePaths } from '../../../../shared/types/enum';
import NumberInput from '../../../../shared/ui/NumberInput';
import useCart from '../../../../api/hooks/useCart';
import { useAppSelector } from '../../../../shared/store/hooks';

interface CartItemProps {
  item: LineItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { changeItemQuantity, deleteItem } = useCart();
  const { cart } = useAppSelector((state) => state.cart);

  const parsedItem = parseLineItem(item);
  const { images, name, productId, prices, quantity, id } = parsedItem;
  const productLink = `${RoutePaths.PRODUCT}/${productId}`;

  const handleItemDelete = async () => {
    if (cart) {
      // eslint-disable-next-line no-console
      await deleteItem(cart.version, id).catch((error) => console.log(error));
    }
  };

  const handleItemQuantityChange = async (value: number | null) => {
    if (cart) {
      if (value) {
        // eslint-disable-next-line no-console
        await changeItemQuantity(cart.version, id, value).catch((error) => console.log(error));
      } else {
        // if input is empty delete product completely
        await handleItemDelete();
      }
    }
  };

  return (
    <Box sx={cartItemSx} height={{ xs: ITEM_HEIGHT_XS }}>
      <LinkRouter to={productLink} mr={5}>
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
      <Box width="100%" display="flex" justifyContent="space-between" flexDirection="column">
        <Box sx={cartItemInfoSx}>
          <IconButton sx={cartItemRemoveSx} onClick={handleItemDelete}>
            <Delete />
          </IconButton>
          <Typography variant="body1" component="div">
            {name}
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            {`Article: ${productId}`}
          </Typography>
          <Box display="flex" alignItems="center">
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <NumberInput onChange={(_, newValue) => handleItemQuantityChange(newValue)} min={1} defaultValue={quantity} />
          <Typography variant="h5" component="div">
            {prices.totalPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
