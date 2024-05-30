import { ProductProjection } from '@commercetools/platform-sdk';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import parseProduct from '../../shared/utils/parseProduct';

interface ProductCardProps {
  product: ProductProjection;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const parsedProduct = parseProduct(product);

  return (
    <Card>
      <CardMedia component="img" image={parsedProduct.images.at(0)?.url} alt={parsedProduct.name} height={300} />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h5" component="div">
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
