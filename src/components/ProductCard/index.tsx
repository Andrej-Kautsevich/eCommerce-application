import { ProductProjection } from '@commercetools/platform-sdk';
import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import parseProduct from '../../shared/utils/parseProduct';
import emptyImage from '../../shared/assets/images/empty-img.png';
import {
  HoverBox,
  productCardActionSx,
  productCardContentSx,
  productCardMediaSx,
  productCardSx,
} from './productCardStyles';
import { RoutePaths } from '../../shared/types/enum';
import { CARD_MD_HEIGHT, CARD_SM_HEIGHT, CARD_XS_HEIGHT } from './constants';
import AddCartBtn from '../AddCartBtn';
import { useAppSelector } from '../../shared/store/hooks';
import containsProduct from '../../shared/utils/containsProduct';

interface ProductCardProps {
  product: ProductProjection | undefined;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const parsedProduct = product ? parseProduct(product) : undefined;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const productLink = `${RoutePaths.PRODUCT}/${parsedProduct?.id}`;
  const productName = parsedProduct?.name;
  const productDescription = parsedProduct?.description;
  const productPrice = parsedProduct?.price;
  const productDiscountPrice = parsedProduct?.discountPrice;
  const productID = parsedProduct?.id;
  const cart = useAppSelector((state) => state.cart.cart);
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    if (cart && productID) {
      if (containsProduct(cart, productID)) {
        cart.lineItems.forEach((item) => {
          if (item.productId === productID) {
            setItemQuantity(item.quantity);
          }
        });
      } else {
        setItemQuantity(0);
      }
    }
  }, [cart, productID]);

  return (
    <Box height={{ xs: CARD_XS_HEIGHT, sm: CARD_SM_HEIGHT, md: CARD_MD_HEIGHT }}>
      <Card sx={productCardSx}>
        <CardActionArea component={RouterLink} to={productLink} sx={productCardActionSx} disabled={!product}>
          {parsedProduct && (
            <HoverBox>
              <ShoppingCartOutlined fontSize="large" sx={{ color: 'primary.contrastText', mb: 1 }} />
              <Typography variant="body2" color="primary.contrastText">
                {t('Order Watch')}
              </Typography>
            </HoverBox>
          )}
          {parsedProduct ? (
            <>
              {!imageLoaded && <Skeleton variant="rectangular" animation="wave" sx={productCardMediaSx} />}
              <CardMedia
                component="img"
                image={parsedProduct.images.at(0)?.url}
                alt={parsedProduct.name}
                sx={{
                  ...productCardMediaSx,
                  display: imageLoaded ? 'block' : 'none',
                  mr: '10',
                }}
                onLoad={handleImageLoad}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = emptyImage;
                }}
              />
            </>
          ) : (
            <Skeleton variant="rectangular" animation="wave" sx={productCardMediaSx} />
          )}
          <CardContent sx={productCardContentSx}>
            <Typography width="100%" variant="body1" component="div" textAlign="center">
              {productName || <Skeleton variant="text" width="100%" animation="wave" />}
            </Typography>
            <Typography width="100%" variant="caption">
              {productDescription || <Skeleton variant="text" width="100%" animation="wave" />}
            </Typography>
            <Typography
              width="100%"
              variant="body2"
              component="div"
              sx={productDiscountPrice ? { textDecoration: 'line-through' } : null}
            >
              {productPrice || <Skeleton variant="text" width="100%" animation="wave" />}
            </Typography>
            {productDiscountPrice && (
              <Typography width="100%" variant="h5" component="div" color="error.light">
                {productDiscountPrice}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <AddCartBtn productID={productID} quantity={itemQuantity} />
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
