import { ProductProjection } from '@commercetools/platform-sdk';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import parseProduct from '../../shared/utils/parseProduct';
import { productCardActionSx, productCardContentSx, productCardMediaSx, productCardSx } from './productCarsStyles';
import { RoutePaths } from '../../shared/types/enum';

interface ProductCardProps {
  product: ProductProjection;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const parsedProduct = parseProduct(product);

  return (
    <Card sx={productCardSx}>
      <CardActionArea component={RouterLink} to={`${RoutePaths.PRODUCT}/${parsedProduct.id}`} sx={productCardActionSx}>
        <CardMedia
          component="img"
          image={parsedProduct.images.at(0)?.url}
          alt={parsedProduct.name}
          sx={productCardMediaSx}
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
