import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { Breadcrumbs, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import PageTitle from '../components/PageTitle';
import MainLayout from '../shared/ui/MainLayout';
import { useCustomer } from '../api/hooks';
import CartItems from '../components/Cart/CartItems';
import CartTotalPrice from '../components/Cart/CartTotalPrice';
import CartPromoCode from '../components/Cart/CartPromoCode';
import CartRemoveAllItems from '../components/Cart/CartRemoveAllItems';
import LinkRouter from '../shared/ui/LinkRouter';
import { RoutePaths } from '../shared/types/enum';

const BasketPage = () => {
  const [cart, setCart] = useState<Cart | undefined>(undefined);

  const { getCart } = useCustomer();

  useEffect(() => {
    const fetchCart = async () => {
      const response = await getCart();
      setCart(response.body.results[0]);
    };

    // eslint-disable-next-line no-console
    fetchCart().catch((error) => console.error('error fetching cart: ', error));

    // try {
    //   getCart()
    //     .then((res) => setCart(res.body))
    //     // eslint-disable-next-line no-console
    //     .catch((error) => console.log(error));
    // } catch (error) {
    //   throw new Error('error fetching cart');
    // }
  }, [getCart]);

  if (!cart || !cart.lineItems)
    return (
      <MainLayout>
        <PageTitle>
          <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
            Your Cart
          </Typography>
        </PageTitle>
      </MainLayout>
    );

  return (
    <MainLayout>
      <PageTitle>
        <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
          Your Cart
        </Typography>
        <Breadcrumbs sx={{ pt: 1 }} aria-label="breadcrumbs">
          <LinkRouter underline="none" color="inherit" to={RoutePaths.MAIN}>
            <Typography variant="body1" color="secondary">
              Main
            </Typography>
          </LinkRouter>
          <Typography variant="body1" color="secondary">
            Cart
          </Typography>
        </Breadcrumbs>
      </PageTitle>
      <Grid container>
        <Grid xs={12}>
          <CartItems items={cart.lineItems} />
          <Divider flexItem />
        </Grid>
        <Grid xs={6} alignSelf="center">
          <CartPromoCode />
        </Grid>
        <Grid xs={3} />
        <Grid xs={3} textAlign="end">
          <CartTotalPrice totalPrice={cart.totalPrice} />
          <CartRemoveAllItems />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default BasketPage;
