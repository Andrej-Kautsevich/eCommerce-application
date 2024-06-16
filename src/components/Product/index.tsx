import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { Box, CircularProgress, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useProduct from '../../api/hooks/useProduct';
import Carousel from './Carousel';
import PageTitle from '../PageTitle';
import AddCartBtn from '../AddCartBtn';
import DeleteCartBtn from '../DeleteCartBtn';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';

const Product = () => {
  const productID = useLocation().pathname.split('/').slice(2).join(); // delete /product/ path
  const { getProduct } = useProduct();
  const [product, setProduct] = useState<ProductProjection | undefined>(undefined);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const [itemID, setItemID] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    function containsProduct(cartOfItems: Cart, productId: string): boolean {
      return cartOfItems.lineItems.some((obj) => obj.productId === productId);
    }
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
          // TODO solve the problem with ESLINT
          // eslint-disable-next-line no-console
          console.error('Error fetching product:', error);
        }
      }
    };

    // TODO solve the problem with ESLINT
    // eslint-disable-next-line no-console
    fetchProduct().catch((error) => console.log(error));
  }, [getProduct, productID, cart?.lineItems, dispatch, cart]);

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
              {itemQuantity}
            </Typography>
            <AddCartBtn productID={productID} />
            <DeleteCartBtn productID={productID} itemID={itemID} quantity={itemQuantity} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
