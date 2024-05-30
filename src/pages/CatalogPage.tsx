import { ProductProjection } from '@commercetools/platform-sdk';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import useProducts from '../api/hooks/useProducts';
import ProductCard from '../components/ProductCard';
import MainLayout from '../shared/ui/MainLayout';

const GRID_COLUMNS_XS = 6;
const GRID_COLUMNS_SM = 4;
const GRID_COLUMNS_MD = 3;

const GRID_SPACING_XS = 1;
const GRID_SPACING_SM = 2;
const GRID_SPACING_MD = 3;

const CatalogPage = () => {
  const { getProducts } = useProducts();

  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts().then((res) => res.results);
      setProducts([...response]);
    };
    // eslint-disable-next-line no-console
    fetchProducts().catch((error) => console.error(error));
  });

  return (
    <MainLayout>
      <Grid container spacing={{ xs: GRID_SPACING_XS, sm: GRID_SPACING_SM, md: GRID_SPACING_MD }}>
        {products.map((product) => (
          <Grid xs={GRID_COLUMNS_XS} sm={GRID_COLUMNS_SM} md={GRID_COLUMNS_MD} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default CatalogPage;
