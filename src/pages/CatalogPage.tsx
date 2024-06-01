import { ProductProjection } from '@commercetools/platform-sdk';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import MainLayout from '../shared/ui/MainLayout';
import useProduct, { FetchQueryArgs } from '../api/hooks/useProduct';
import { CatalogSideBar, CatalogSortPanel } from '../components/Catalog';
import { useAppSelector } from '../shared/store/hooks';
import parseFilterParams from '../shared/utils/parseFilterParams';

const GRID_COLUMNS_XS = 6;
const GRID_COLUMNS_SM = 4;
const GRID_COLUMNS_MD = 3;

const GRID_SPACING_XS = 1;
const GRID_SPACING_SM = 2;
const GRID_SPACING_MD = 3;

const CatalogPage = () => {
  const { getProducts } = useProduct();
  const { filterParams, sortParam } = useAppSelector((state) => state.products);

  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const queryArgs: FetchQueryArgs = {};

      if (filterParams) {
        const filter = parseFilterParams(filterParams);
        if (filter) queryArgs.filter = filter;
      }

      if (sortParam) queryArgs.sort = sortParam;

      const result = await getProducts(queryArgs).then((res) => res.body.results);
      setProducts([...result]);
    };
    // eslint-disable-next-line no-console
    fetchProducts().catch((error) => console.error(error));
  }, [getProducts, filterParams, sortParam]);

  return (
    <MainLayout>
      <Grid container pt={2} spacing={{ xs: GRID_SPACING_XS }}>
        <Grid xs={12} md={3}>
          <CatalogSideBar />
        </Grid>
        <Grid container sm={12} md={9} flexDirection="column">
          <Grid xs={GRID_COLUMNS_XS} sm={GRID_COLUMNS_SM} md={GRID_COLUMNS_MD} alignSelf="end">
            <CatalogSortPanel />
          </Grid>
          <Grid container mt={1} spacing={{ xs: GRID_SPACING_XS, sm: GRID_SPACING_SM, md: GRID_SPACING_MD }}>
            {products.map((product) => (
              <Grid xs={GRID_COLUMNS_XS} sm={GRID_COLUMNS_SM} md={GRID_COLUMNS_MD} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default CatalogPage;
