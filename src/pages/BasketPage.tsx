import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';
import PageTitle from '../components/PageTitle';
import MainLayout from '../shared/ui/MainLayout';
import { useCustomer } from '../api/hooks';

const BasketPage = () => {
  const [cart, setCart] = useState<Cart | undefined>(undefined);

  const { getCart } = useCustomer();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCart(response.body);
      } catch (error) {
        throw new Error('error fetching cart');
      }
    };

    // eslint-disable-next-line no-console
    fetchCart().catch((error) => console.log(error));
  }, [getCart]);

  if (!cart)
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
      </PageTitle>
    </MainLayout>
  );
};

export default BasketPage;
