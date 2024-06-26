import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Box, CircularProgress, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import useProduct from '../../api/hooks/useProduct';
import Carousel from './Carousel';
import PageTitle from '../PageTitle';
import AddCartBtn from '../AddCartBtn';
import DeleteCartBtn from '../DeleteCartBtn';
import { useAppSelector } from '../../shared/store/hooks';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';
import containsProduct from '../../shared/utils/containsProduct';

const Product = () => {
  const { t } = useTranslation();
  const productID = useLocation().pathname.split('/').slice(2).join(); // delete /product/ path
  const { getProduct } = useProduct();
  const [product, setProduct] = useState<ProductProjection | undefined>(undefined);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const cart = useAppSelector((state) => state.cart.cart);
  const [itemID, setItemID] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProduct = async () => {
      if (cart) {
        if (containsProduct(cart, productID)) {
          cart.lineItems.forEach((item) => {
            if (item.productId === productID) {
              setItemQuantity(item.quantity);
              setItemID(item.id);
            }
          });
        } else {
          setItemQuantity(0);
          setItemID('');
        }

        try {
          const response = await getProduct(productID);
          setProduct(response.body);
          if (response.body.masterVariant.prices![0].value.centAmount) {
            setPrice(response.body.masterVariant.prices![0].value.centAmount);
          }
          if (response.body.masterVariant.prices![0].discounted?.value.centAmount) {
            setDiscount(response.body.masterVariant.prices![0].discounted?.value.centAmount);
          }
        } catch (error) {
          enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' });
        }
      }
    };

    fetchProduct().catch(() =>
      enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' }),
    );
  }, [getProduct, productID, enqueueSnackbar, t, cart]);

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
      <PageTitle title={product.name.en} />

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
              {t('Description:')}
            </Typography>
            <Typography component="p" fontFamily="Poppins" color="text.primary" sx={{ mb: 3 }}>
              {product ? product.description?.en : t('Something is wrong')}
            </Typography>
            <Typography component="p" fontFamily="Poppins" color="text.secondary">
              {t('Price')}
              {': '}
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
                  {t('SALE PRICE')}
                  {': '}
                </Typography>
                <Typography component="p" fontFamily="Poppins" color="red" sx={{ mb: 3, fontSize: 36 }}>
                  {`$${(discount / 100).toFixed(2)}`}
                </Typography>
              </Box>
            )}
            {/* <Typography component="p" fontFamily="Poppins" color="text.secondary">
              {t('Items in cart')}
              {': '}
            </Typography> */}
            {/* <Typography
              component="p"
              fontFamily="Poppins"
              color="text.primary"
              sx={{
                mb: 3,
              }}
            >
              {itemQuantity}
            </Typography> */}

            <AddCartBtn productID={productID} quantity={itemQuantity} />
            <DeleteCartBtn productID={productID} itemID={itemID} quantity={itemQuantity} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
