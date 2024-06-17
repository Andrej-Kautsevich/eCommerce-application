import { Box, Breadcrumbs, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { cart } = useAppSelector((state) => state.cart);

  if (!cart || cart.lineItems.length === 0)
    return (
      <MainLayout>
        <PageTitle title="{t('Your Cart')}">
          <Breadcrumbs sx={{ pt: 1 }} aria-label="breadcrumbs">
            <LinkRouter underline="none" color="inherit" to={RoutePaths.MAIN}>
              <Typography variant="body1">{t('Main')}</Typography>
            </LinkRouter>
            <Typography variant="body1">{t('Cart')}</Typography>
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
          <Typography variant="h5" color="text.primary">
            {t('Your Cart is Empty')}
          </Typography>
          <LinkRouter to={RoutePaths.WATCHES}>
            <Button variant="contained" sx={{ mt: 2 }}>
              {t('Continue shopping')}
            </Button>
          </LinkRouter>
        </Box>
      </MainLayout>
    );

  return (
    <MainLayout>
      <PageTitle title="{t('Your Cart')}">
        <Breadcrumbs sx={{ pt: 1 }} aria-label="breadcrumbs">
          <LinkRouter underline="none" color="inherit" to={RoutePaths.MAIN}>
            <Typography variant="body1" color="primary.contrastText">
              {t('Main')}
            </Typography>
          </LinkRouter>
          <Typography variant="body1" color="primary.contrastText">
            {t('Cart')}
          </Typography>
        </Breadcrumbs>
      </PageTitle>
      <Grid container>
        <Grid xs={12}>
          <CartItems items={cart.lineItems} />
          <Divider flexItem />
        </Grid>
        <Grid xs={6} alignSelf="center">
          <CartPromoCodeBox cart={cart} />
        </Grid>
        <Grid xs={3} />
        <Grid xs={3} textAlign="end">
          <CartTotalPrice cart={cart} />
          <CartRemoveAllItems />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default BasketPage;
