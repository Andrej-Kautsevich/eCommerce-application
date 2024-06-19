import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { ProductProjection } from '@commercetools/platform-sdk';
import { enqueueSnackbar } from 'notistack';
import { useMediaQuery, useTheme } from '@mui/material';
import useProduct, { FetchQueryArgs } from '../../api/hooks/useProduct';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';
import ProductCard from '../ProductCard';
import chunkProducts from './chunkProducts';

const CAROUSEL_ITEMS = 12;
const PRODUCTS_IN_CAROUSEL_ITEM_MD = 4;
const PRODUCTS_IN_CAROUSEL_ITEM_SM = 3;
const PRODUCTS_IN_CAROUSEL_ITEM_XS = 1;

const ProductCarousel = () => {
  const { t } = useTranslation();
  const { getProducts } = useProduct();
  const [isProductsFetching, setIsProductsFetching] = useState(true);
  const [chunkSize, setChunkSize] = useState(PRODUCTS_IN_CAROUSEL_ITEM_MD);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsProductsFetching(true);
      const queryArgs: FetchQueryArgs = {
        limit: CAROUSEL_ITEMS,
      };

      const result = await getProducts(queryArgs);
      setProducts(result.body.results);
      setIsProductsFetching(false);
    };

    fetchProducts().catch(() =>
      enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' }),
    );
  }, [getProducts, t]);

  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    let newChunkSize = PRODUCTS_IN_CAROUSEL_ITEM_MD; // Default to md
    if (isExtraSmallScreen) {
      newChunkSize = PRODUCTS_IN_CAROUSEL_ITEM_XS;
    } else if (isSmallScreen) {
      newChunkSize = PRODUCTS_IN_CAROUSEL_ITEM_SM;
    }
    setChunkSize(newChunkSize);
  }, [isExtraSmallScreen, isSmallScreen]);

  // create empty array to pass undefined to ProductCard to show skeletons on loading
  const emptyArray = chunkProducts(Array.from(new Array(CAROUSEL_ITEMS)) as ProductProjection[], chunkSize);

  return (
    /* disable indicators on xs screen */
    <Carousel indicators={!isExtraSmallScreen} duration={1000} sx={{ pt: 2, pb: 2 }}>
      {(isProductsFetching ? emptyArray : chunkProducts(products, chunkSize)).map((productChunk, index) => (
        <Grid container spacing={2} key={productChunk[index]?.id ?? index} sx={{ pl: 1, pr: 1 }}>
          {productChunk.map((product) => (
            <Grid
              xs={12 / PRODUCTS_IN_CAROUSEL_ITEM_XS}
              sm={12 / PRODUCTS_IN_CAROUSEL_ITEM_SM}
              md={12 / PRODUCTS_IN_CAROUSEL_ITEM_MD}
            >
              <ProductCard key={product ? product.id : index} product={product} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
