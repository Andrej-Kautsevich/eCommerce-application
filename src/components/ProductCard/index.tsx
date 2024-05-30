import { ProductProjection } from '@commercetools/platform-sdk';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import parseProduct from '../../shared/utils/parseProduct';
import { productCardContentSx, productCardMediaSx, productCardSx } from './productCarsStyles';

interface ProductCardProps {
  product: ProductProjection;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const parsedProduct = parseProduct(product);

  return (
    <Card sx={productCardSx}>
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
    </Card>
  );
};

export default ProductCard;
