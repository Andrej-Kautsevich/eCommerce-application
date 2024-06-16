import { Box, Breadcrumbs, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import PageTitle from '../components/PageTitle';
import MainLayout from '../shared/ui/MainLayout';
import CartItems from '../components/Cart/CartItems';
import CartTotalPrice from '../components/Cart/CartTotalPrice';
import CartPromoCodeBox from '../components/Cart/CartPromoCodeBox';
import CartRemoveAllItems from '../components/Cart/CartRemoveAllItems';
import LinkRouter from '../shared/ui/LinkRouter';
import { RoutePaths } from '../shared/types/enum';
import emptyCartImg from '../shared/assets/images/cart.png';
import { useAppSelector } from '../shared/store/hooks';

const BasketPage = () => {
  const { cart } = useAppSelector((state) => state.cart);

  if (!cart || cart.lineItems.length === 0)
    return (
      <MainLayout>
        <PageTitle title="Your Cart">
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
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            component="img"
            src={emptyCartImg}
            alt="empty cart"
            sx={{
              height: '40vh',
              maxWidth: '100%',
              objectFit: 'contain',
              padding: '1.5em 0',
            }}
          />
          <Typography variant="h5">Your Cart is Empty</Typography>
          <LinkRouter to={RoutePaths.WATCHES}>
            <Button variant="contained" sx={{ mt: 2 }}>
              Continue shopping
            </Button>
          </LinkRouter>
        </Box>
      </MainLayout>
    );

  return (
    <MainLayout>
      <PageTitle title="Your Cart">
        <Breadcrumbs sx={{ pt: 1 }} aria-label="breadcrumbs">
          <LinkRouter underline="none" color="inherit" to={RoutePaths.MAIN}>
            <Typography variant="body1" color="primary.contrastText">
              Main
            </Typography>
          </LinkRouter>
          <Typography variant="body1" color="primary.contrastText">
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
          <CartPromoCodeBox />
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
