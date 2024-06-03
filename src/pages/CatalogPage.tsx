import { ProductProjection } from '@commercetools/platform-sdk';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import MainLayout from '../shared/ui/MainLayout';
import useProduct, { FetchQueryArgs } from '../api/hooks/useProduct';
import { CatalogCategoriesSelect, CatalogSearchPanel, CatalogSideBar, CatalogSortPanel } from '../components/Catalog';
import { useAppSelector } from '../shared/store/hooks';
import parseFilterParams from '../shared/utils/parseFilterParams';
import PageTitle from '../components/PageTitle';
import CatalogBreadcrumbs from '../components/CatalogBreadcrumbs';
import { FilterCategories } from '../shared/types/enum';

const GRID_COLUMNS_XS = 6;
const GRID_COLUMNS_SM = 4;
const GRID_COLUMNS_MD = 3;

const GRID_SPACING_XS = 1;
const GRID_SPACING_SM = 2;
const GRID_SPACING_MD = 3;

const CatalogPage = () => {
  const { categorySlug } = useParams();
  const { getProducts } = useProduct();
  const { categories } = useAppSelector((state) => state.products);
  const location = useLocation();
  const { filterParams, sortParam } = useAppSelector((state) => state.products);

  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const queryArgs: FetchQueryArgs = {};
      const filter = [];

      if (categorySlug) {
        const currentCategory = categories.find((category) => category.slug.en === categorySlug);
        const currentCategoryFilter = `${FilterCategories.CATEGORIES}: subtree("${currentCategory?.id}")`;
        filter.push(currentCategoryFilter);
      } else {
        const currentCategorySlug = location.pathname.split('/').join('');
        const currentCategory = categories.find((category) => category.slug.en === currentCategorySlug);
        if (currentCategory) {
          const currentCategoryFilter = `${FilterCategories.CATEGORIES}: subtree("${currentCategory.id}")`;
          filter.push(currentCategoryFilter);
        }
      }

      if (filterParams) {
        const parsedFilterParams = filterParams.map((element) => parseFilterParams(element));
        filter.push(...parsedFilterParams);
      }
      if (filter) queryArgs.filter = filter;

      if (sortParam) queryArgs.sort = sortParam;

      const result = await getProducts(queryArgs).then((res) => res.body.results);
      setProducts([...result]);
    };
    // eslint-disable-next-line no-console
    fetchProducts().catch((error) => console.error(error));
  }, [getProducts, filterParams, sortParam, categorySlug, categories, location.pathname]);

  return (
    <MainLayout>
      <PageTitle title="Catalog">
        <CatalogBreadcrumbs />
      </PageTitle>
      <CatalogCategoriesSelect />
      <Grid container pt={2} spacing={{ xs: GRID_SPACING_XS }}>
        <Grid xs={12} md={3}>
          <CatalogSideBar />
        </Grid>
        <Grid container sm={12} md={9} flexDirection="column">
          <Grid container>
            <Grid xs="auto" flexGrow={1}>
              <CatalogSearchPanel />
            </Grid>
            <Grid xs={GRID_COLUMNS_XS} sm={GRID_COLUMNS_SM} md={GRID_COLUMNS_MD}>
              <CatalogSortPanel />
            </Grid>
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
