import { ProductProjection } from '@commercetools/platform-sdk';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import parseProduct from '../../shared/utils/parseProduct';
import {
  HoverBox,
  productCardActionSx,
  productCardContentSx,
  productCardMediaSx,
  productCardSx,
} from './productCarsStyles';
import { RoutePaths } from '../../shared/types/enum';

interface ProductCardProps {
  product: ProductProjection;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const parsedProduct = parseProduct(product);

  return (
    <Card sx={productCardSx}>
      <CardActionArea component={RouterLink} to={`${RoutePaths.WATCHES}/${parsedProduct.id}`} sx={productCardActionSx}>
        <HoverBox>
          <ShoppingCartOutlined fontSize="large" sx={{ color: 'primary.contrastText', mb: 1 }} />
          <Typography variant="body2" color="primary.contrastText">
            Order Watch
          </Typography>
        </HoverBox>
        <CardMedia
          component="img"
          image={parsedProduct.images.at(0)?.url}
          alt={parsedProduct.name}
          sx={productCardMediaSx}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'images/empty-img.png';
          }}
        />
        <CardContent sx={productCardContentSx}>
          <Typography variant="body1" component="div" textAlign="center">
            {parsedProduct.name}
          </Typography>
          <Typography variant="caption">{parsedProduct.description}</Typography>
          <Typography variant="h5" component="div">
            {parsedProduct.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
