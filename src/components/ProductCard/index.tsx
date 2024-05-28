import { ProductProjection } from '@commercetools/platform-sdk';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';

interface ProductCardProps {
  product: ProductProjection;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { masterVariant, name } = product;
  return (
    <Card>
      <CardMedia component="img" image={masterVariant.images?.at(0)?.url} alt={name.en} />
      <CardContent>
        <Typography variant="body2">{name.en}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
