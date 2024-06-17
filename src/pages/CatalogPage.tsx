import { ProductProjection } from '@commercetools/platform-sdk';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ProductCard from '../components/ProductCard';
import MainLayout from '../shared/ui/MainLayout';
import useProduct, { FetchQueryArgs } from '../api/hooks/useProduct';
import { CatalogCategoriesSelect, CatalogSearchPanel, CatalogSideBar, CatalogSortPanel } from '../components/Catalog';
import { useAppSelector } from '../shared/store/hooks';
import parseFilterParams from '../shared/utils/parseFilterParams';
import PageTitle from '../components/PageTitle';
import CatalogBreadcrumbs from '../components/CatalogBreadcrumbs';
import { SnackbarMessages, FilterCategories } from '../shared/types/enum';

const GRID_COLUMNS_XS = 6;
const GRID_COLUMNS_SM = 6;
const GRID_COLUMNS_MD = 4;
const GRID_COLUMNS_LG = 4;

const GRID_SPACING_XS = 1;
const GRID_SPACING_SM = 2;
const GRID_SPACING_MD = 3;

const ITEMS_PER_PAGE = 6;

const CatalogPage = () => {
  const { categorySlug } = useParams();
  const { getProducts } = useProduct();
  const { categories } = useAppSelector((state) => state.products);
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { filterParams, sortParam, searchParam: searchString } = useAppSelector((state) => state.products);
  const [isProductsFetching, setIsProductsFetching] = useState(true);
  const [totalProducts, setTotalProducts] = useState<number | undefined>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const offsetValue = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
  const totalPages = Math.ceil(totalProducts! / ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsProductsFetching(true);
      const queryArgs: FetchQueryArgs = {
        limit: ITEMS_PER_PAGE,
        offset: offsetValue,
        fuzzy: true,
      };
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
      if (searchString) {
        queryArgs['text.en'] = searchString;
      }
      if (filter) queryArgs.filter = filter;

      if (sortParam) queryArgs.sort = sortParam;

      const result = await getProducts(queryArgs).then((res) => {
        setIsProductsFetching(false);
        setTotalProducts(res.body.total);
        return res.body.results;
      });
      setProducts([...result]);
    };

    fetchProducts().catch(() => enqueueSnackbar(SnackbarMessages.GENERAL_ERROR, { variant: 'error' }));
  }, [
    getProducts,
    filterParams,
    sortParam,
    categorySlug,
    categories,
    location.pathname,
    searchString,
    offsetValue,
    enqueueSnackbar,
  ]);

  return (
    <MainLayout>
      <PageTitle title="Catalog">
        <Box>
          <CatalogBreadcrumbs />
        </Box>
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
          <Grid
            container
            mt={1}
            spacing={{ xs: GRID_SPACING_XS, sm: GRID_SPACING_SM, md: GRID_SPACING_MD }}
            sx={{ mb: 3 }}
          >
            {(isProductsFetching ? Array.from(new Array(ITEMS_PER_PAGE)) : products).map(
              (product: ProductProjection, index) => (
                <Grid
                  xs={GRID_COLUMNS_XS}
                  sm={GRID_COLUMNS_SM}
                  md={GRID_COLUMNS_MD}
                  lg={GRID_COLUMNS_LG}
                  key={product ? product.id : index}
                >
                  <ProductCard product={product} />
                </Grid>
              ),
            )}
          </Grid>
          <Box sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}>
            <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default CatalogPage;
