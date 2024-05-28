import { ProductProjection } from '@commercetools/platform-sdk';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import useProducts from '../api/hooks/useProducts';
import ProductCard from '../components/ProductCard';

const CatalogPage = () => {
  const { getProducts } = useProducts();

  const [products, setProducts] = useState<ProductProjection[]>([]);

  const getProductsHandle = async () => {
    const response = await getProducts().then((res) => res.results);
    setProducts([...response]);
  };

  return (
    <Box>
      <Button variant="contained" onClick={getProductsHandle}>
        get products
      </Button>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid xs={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CatalogPage;
