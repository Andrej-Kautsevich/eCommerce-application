import { useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { Box, CardMedia, CircularProgress, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import emptyImage from '../../../../shared/assets/images/empty-img.png';
import parseLineItem from '../../../../shared/utils/parseCartLineItem';
import { cartItemInfoSx, cartItemMediaSx, cartItemRemoveSx, cartItemSx } from './CartItemStyles';
import { ITEM_HEIGHT_XS } from '../../constants';
import LinkRouter from '../../../CatalogBreadcrumbs/LinkRouter';
import { RoutePaths, SnackbarMessages } from '../../../../shared/types/enum';
import NumberInput from '../../../../shared/ui/NumberInput';
import useCart from '../../../../api/hooks/useCart';
import { useAppSelector } from '../../../../shared/store/hooks';
import getSnackbarMessage from '../../../../shared/utils/getSnackbarMessage';

interface CartItemProps {
  item: LineItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { t } = useTranslation();
  const { changeItemQuantity, deleteItem } = useCart();
  const { cart } = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [quantityLoading, setQuantityLoading] = useState(false);

  const parsedItem = parseLineItem(item);
  const { images, name, productId, prices, quantity, id } = parsedItem;
  const productLink = `${RoutePaths.PRODUCT}/${productId}`;

  const handleItemDelete = async () => {
    if (cart) {
      try {
        setLoading(true);
        await deleteItem(cart.version, id);
        setLoading(false);
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.REMOVE_ITEM_SUCCESS, t), { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.DELETE_ITEM_FETCH_ERROR, t), { variant: 'error' });
        setLoading(false);
      }
    }
  };

  const handleItemQuantityChange = async (value: number | null) => {
    if (cart) {
      if (value) {
        try {
          setQuantityLoading(true);
          await changeItemQuantity(cart.version, id, value);
          setQuantityLoading(false);
        } catch (error) {
          enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' });
          setQuantityLoading(false);
        }
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
          <IconButton sx={cartItemRemoveSx} disabled={loading} onClick={handleItemDelete}>
            {loading ? (
              <CircularProgress
                size="small"
                sx={{
                  width: '24px',
                }}
              />
            ) : (
              <Delete />
            )}
          </IconButton>
          <Typography variant="body1" component="div" color="text.primary">
            {name}
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            {`Article: ${productId}`}
          </Typography>
          <Box display="flex" alignItems="center" color="text.primary">
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
          <NumberInput
            onChange={(_, newValue) => handleItemQuantityChange(newValue)}
            min={1}
            defaultValue={quantity}
            slotProps={{
              incrementButton: { disabled: quantityLoading },
              decrementButton: { disabled: quantityLoading },
            }}
          />
          <Typography variant="h5" component="div" color="text.primary">
            {prices.totalPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
