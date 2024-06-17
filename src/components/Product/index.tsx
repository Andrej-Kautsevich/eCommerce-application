import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ClientResponse, ErrorObject, ProductProjection } from '@commercetools/platform-sdk';
import { Box, CircularProgress, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import useProduct from '../../api/hooks/useProduct';
import Carousel from './Carousel';
import PageTitle from '../PageTitle';
import AddCartBtn from '../AddCartBtn';
import DeleteCartBtn from '../DeleteCartBtn';
import { useCustomer } from '../../api/hooks';
import { setCurrencyProductCount, setCurrencyItemCartId, setCartId } from '../../shared/store/auth/cartSlice';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { SnackbarMessages } from '../../shared/types/enum';

const Product = () => {
  const productID = useLocation().pathname.split('/').slice(2).join(); // delete /product/ path
  const { getProduct } = useProduct();
  const [product, setProduct] = useState<ProductProjection | undefined>(undefined);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { getCart } = useCustomer();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const currencyProductCount = useAppSelector((state) => state.cart.currencyProductCount);

  const fetchCart = async () => {
    const response = await getCart();
    const itemList = response.body.results[0].lineItems;

    dispatch(setCartId(response.body.results[0].id));
    for (let i = 0; i < itemList.length; i += 1) {
      if (itemList[i].productId === productID) {
        dispatch(setCurrencyItemCartId(itemList[i].id));
        dispatch(setCurrencyProductCount(itemList[i].quantity));
      }
    }
  };
  fetchCart().catch(() => {
    enqueueSnackbar(SnackbarMessages.CART_FETCH_ERROR, { variant: 'error' });
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(productID);
        setProduct(response.body);
        if (response.body.masterVariant.prices![0].value.centAmount) {
          setPrice(response.body.masterVariant.prices![0].value.centAmount);
        }
        if (response.body.masterVariant.prices![0].discounted?.value.centAmount) {
          setDiscount(response.body.masterVariant.prices![0].discounted?.value.centAmount);
        }
      } catch (e) {
        const error = e as ClientResponse<ErrorObject>;
        enqueueSnackbar(error.body.message, { variant: 'error' });
      }
    };

    fetchProduct().catch(() => enqueueSnackbar(SnackbarMessages.GENERAL_ERROR, { variant: 'error' }));
  }, [getProduct, productID, currencyProductCount, enqueueSnackbar]);

  if (!product) {
    return (
      <Box style={{ display: 'flex', flexDirection: 'column' }}>
        <PageTitle>
          <Skeleton variant="text" width="80%" animation="wave" />
        </PageTitle>
        <CircularProgress sx={{ alignSelf: 'center' }} />;
      </Box>
    );
  }

  return (
    <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
      <PageTitle>
        <Box>
          <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
            {product.name.en}
          </Typography>
        </Box>
      </PageTitle>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={2}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid xs={4} sm={8} md={8} style={{ display: 'flex', justifyContent: 'center', maxHeight: '500px' }}>
          <Carousel product={product} />
        </Grid>

        <Grid xs={4} sm={8} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box style={{ maxWidth: '390px' }}>
            <Typography component="p" fontFamily="Poppins" color="text.secondary">
              Description:
            </Typography>
            <Typography component="p" fontFamily="Poppins" color="text.primary" sx={{ mb: 3 }}>
              {product ? product.description?.en : 'Something is wrong'}
            </Typography>
            <Typography component="p" fontFamily="Poppins" color="text.secondary">
              Price:
            </Typography>
            <Typography
              component="p"
              fontFamily="Poppins"
              color="text.primary"
              sx={{
                mb: 3,
                textDecoration: discount > 0 ? 'line-through' : 'none',
              }}
            >
              {`$${(price / 100).toFixed(2)}`}
            </Typography>
            {discount > 0 && (
              <Box>
                <Typography component="p" fontFamily="Poppins" color="text.secondary">
                  SALE PRICE:
                </Typography>
                <Typography component="p" fontFamily="Poppins" color="red" sx={{ mb: 3, fontSize: 36 }}>
                  {`$${(discount / 100).toFixed(2)}`}
                </Typography>
              </Box>
            )}
            <Typography component="p" fontFamily="Poppins" color="text.secondary">
              Items in cart:
            </Typography>
            <Typography
              component="p"
              fontFamily="Poppins"
              color="text.primary"
              sx={{
                mb: 3,
              }}
            >
              {currencyProductCount}
            </Typography>
            <AddCartBtn />
            <DeleteCartBtn />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
